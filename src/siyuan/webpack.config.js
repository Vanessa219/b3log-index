const path = require("path");
const PugPlugin = require("pug-plugin");
const sitePages = require("./site-pages.json");

module.exports = (env, argv) => {
  return {
    mode: argv.mode || "development",
    watch: argv.mode !== "production",
    devtool: argv.mode !== "production" ? "eval" : false,
    resolve: {
      extensions: [".pug"],
    },
    output: {
      publicPath: "",
      path: path.resolve(__dirname, "dist"),
    },
    entry: Object.fromEntries(Object.keys(sitePages).map((key) => [key, `./src/${key}.pug`])),
    plugins: [
      new PugPlugin(),
      {
        apply(compiler) {
          compiler.hooks.thisCompilation.tap("SiYuanSitemap", (compilation) => {
            compilation.hooks.processAssets.tap({
              name: "SiYuanSitemap",
              stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
            }, () => {
              const urls = Object.keys(sitePages).map((key) => {
                const pagePath = key === "index" ? "" : key === "en/index" ? "en/" : key + ".html";
                return `  <url><loc>https://b3log.org/siyuan/${pagePath}</loc></url>`;
              });
              const sitemap = [
                "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
                "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
                ...urls,
                "</urlset>",
                "",
              ].join("\n");
              compilation.emitAsset("sitemap.xml", new compiler.webpack.sources.RawSource(sitemap));
            });
          });
        },
      },
    ],
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: PugPlugin.loader,
          options: {
            method: "render",
          },
        },
      ],
    },
  };
};
