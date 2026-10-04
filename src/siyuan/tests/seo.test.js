const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const vm = require("node:vm");
const {after, before, test} = require("node:test");
const webpack = require("webpack");
const configFactory = require("../webpack.config.js");

const root = path.resolve(__dirname, "..");
const output = fs.mkdtempSync(path.join(os.tmpdir(), "b3log-seo-"));
const siteRoot = "https://b3log.org/siyuan/";
const documents = new Map();

function tags(html, name) {
    return Array.from(html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, "g")), (match) => {
        return Object.fromEntries(Array.from(match[1].matchAll(/([\w-]+)(?:="([^"]*)")?/g),
            (attribute) => [attribute[1], attribute[2] ?? ""]));
    });
}

function executePrompt(html, browserLanguage, search = "") {
    let dismiss;
    const prompt = {
        hidden: true,
        querySelector: () => ({addEventListener: (event, handler) => { dismiss = handler; }}),
    };
    const script = Array.from(html.matchAll(/<script>([\s\S]*?)<\/script>/g), (match) => match[1])
        .find((value) => value.includes("[data-language-prompt]"));
    vm.runInNewContext(script, {
        document: {querySelector: () => prompt, documentElement: {lang: tags(html, "html")[0].lang}},
        navigator: {languages: browserLanguage ? [browserLanguage] : [], language: browserLanguage},
        window: {location: {search}},
        URLSearchParams,
    });
    return {prompt, dismiss};
}

before(async () => {
    const config = configFactory({}, {mode: "production"});
    config.context = root;
    config.watch = false;
    config.output.path = output;
    const compiler = webpack(config);
    try {
        await new Promise((resolve, reject) => compiler.run((error, stats) => {
            if (error) {
                reject(error);
            } else if (stats.hasErrors() || stats.hasWarnings()) {
                reject(new Error(stats.toString({all: false, errors: true, warnings: true})));
            } else {
                resolve();
            }
        }));
    } finally {
        await new Promise((resolve, reject) => compiler.close((error) => error ? reject(error) : resolve()));
    }
    for (const key of Object.keys(config.entry)) {
        const html = fs.readFileSync(path.join(output, `${key}.html`), "utf8");
        const canonical = tags(html, "link").filter((tag) => tag.rel === "canonical");
        assert.equal(canonical.length, 1, key);
        assert.ok(!documents.has(canonical[0].href), key);
        documents.set(canonical[0].href, {key, html});
    }
});

after(() => {
    assert.equal(path.dirname(path.resolve(output)), path.resolve(os.tmpdir()));
    assert.ok(path.basename(output).startsWith("b3log-seo-"));
    fs.rmSync(output, {recursive: true, force: true});
});

test("all pages have distinct metadata, correct language and reciprocal language alternatives", () => {
    assert.equal(documents.size, 15);
    const titles = new Set();
    for (const [url, {key, html}] of documents) {
        const english = key.startsWith("en/");
        assert.equal(tags(html, "html")[0].lang, english ? "en" : "zh-Hans");
        assert.equal(tags(html, "meta").find((tag) => tag.property === "og:url").content, url);
        assert.equal(tags(html, "meta").find((tag) => tag.name === "twitter:url").content, url);
        assert.equal(tags(html, "meta").find((tag) => tag.property === "og:locale").content,
            english ? "en_US" : "zh_CN");
        assert.ok(tags(html, "meta").find((tag) => tag.name === "description").content.length > 10);
        const title = html.match(/<title>(.*?)<\/title>/)[1];
        assert.ok(!titles.has(title), key);
        titles.add(title);
        const alternates = tags(html, "link").filter((tag) => tag.rel === "alternate");
        assert.equal(alternates.length, key === "distributors/lizhi" ? 0 : 2);
        for (const alternate of alternates) {
            const target = documents.get(alternate.href);
            assert.ok(target, key);
            assert.equal(alternate.hreflang, tags(target.html, "html")[0].lang);
            assert.ok(tags(target.html, "link").some((tag) => tag.rel === "alternate" && tag.href === url));
        }
        for (const source of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
            new vm.Script(source[1]);
            assert.ok(!/location\.(?:href\s*=|replace\(|assign\()/.test(source[1]), key);
        }
    }
});

test("language links preserve the page and brand links stay in the current language", () => {
    for (const [url, {key, html}] of documents) {
        for (const anchor of tags(html, "a")) {
            if (!anchor.href || anchor.href.startsWith("#")) {
                continue;
            }
            const target = new URL(anchor.href, url);
            if (target.origin === new URL(siteRoot).origin && target.pathname.startsWith("/siyuan/") &&
                !target.pathname.includes("/static/")) {
                assert.ok(documents.has(target.origin + target.pathname), `${key}: ${anchor.href}`);
            }
            if (Object.hasOwn(anchor, "data-language-switch")) {
                const expected = key === "distributors/lizhi" ? "en/index" :
                    key.startsWith("en/") ? key.slice(3) : "en/" + key;
                assert.equal(documents.get(target.origin + target.pathname)?.key, expected, key);
                assert.equal(target.search, "");
            }
            if (anchor.class === "header__logo") {
                assert.equal(target.href, siteRoot + (key.startsWith("en/") ? "en/" : ""));
            }
        }
    }
});

test("language suggestions respect browser language, explicit legacy links and dismissal", () => {
    for (const {key, html} of documents.values()) {
        const english = key.startsWith("en/");
        for (const language of ["zh-CN", "zh-TW", "ZH-Hant", "en-US", "ja-JP", ""]) {
            const {prompt, dismiss} = executePrompt(html, language);
            const mismatch = language && language.toLowerCase().startsWith("zh") === english;
            assert.equal(prompt.hidden, !mismatch, `${key}: ${language}`);
            dismiss();
            assert.equal(prompt.hidden, true);
        }
        for (const search of ["?lang=cn", "?lang=en", "?lang=zh"]) {
            assert.equal(executePrompt(html, english ? "zh-CN" : "en-US", search).prompt.hidden, true);
        }
    }
});

test("homepage descriptions include all three product priorities as static content", () => {
    assert.ok(documents.get(siteRoot).html.includes("开源、本地优先、隐私优先的笔记软件"));
    assert.ok(documents.get(siteRoot + "en/").html.includes("open-source, local-first, privacy-first note-taking app"));
    for (const url of [siteRoot, siteRoot + "en/"]) {
        assert.ok(documents.get(url).html.includes(`const lang = "${url === siteRoot ? "zh" : "en"}";`));
    }
});

test("sitemap lists exactly the canonical pages", () => {
    const sitemap = fs.readFileSync(path.join(output, "sitemap.xml"), "utf8");
    const urls = Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g), (match) => match[1]);
    assert.equal(new Set(urls).size, urls.length);
    assert.deepEqual(urls.sort(), Array.from(documents.keys()).sort());
});
