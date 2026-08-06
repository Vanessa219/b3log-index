const type = () => {
  const typeElement = document.querySelector('#slogan')
  let texts
  if (typeof lang !== 'undefined' && 'zh' === lang) {
    texts = [
      '随时随地离线可用',
      '端到端加密保证隐私安全',
      '优雅的 Markdown 编辑体验',
      '文字创作时沉浸在内容构思中',
      '触摸灵感和思绪的清晰脉络',
      '将知识碎片构建成结构化的体系',
      '找到那些埋藏在记忆深处的灵犀',
      '思源有云，往来随心',
    ]
  } else {
    texts = [
      'Available offline anytime, anywhere',
      'End-to-end encryption ensures privacy and security',
      'Elegant Markdown editing experience',
      'Immerse yourself in content ideas while writing',
      'Touch a clear vein of inspiration and thought',
      'Build knowledge fragments into a structured system',
      'Find those consonants buried deep in memory',
      'SiYuan has a cloud, and you can communicate with your heart',
    ]
  }
  let textLength = 0
  let time = 0
  texts.forEach((text, i) => {
    if (i > 0) {
      textLength += text[i - 1].length + 20
    }
    for (let j = 0; j < text.length; j++) {
      time += 150
      setTimeout(() => {
        typeElement.innerHTML = text.substr(0, j + 1) +
          `<span class="second__caret" style="${(j === text.length - 1
            ? 'animation-name:flash'
            : '')}"></span>`
      }, time)
    }
    if (i !== texts.length - 1) {
      time += 2000
      for (let k = 0; k < text.length; k++) {
        time += 50
        setTimeout(() => {
          typeElement.innerHTML = typeElement.textContent.substr(0,
              typeElement.textContent.length - 1) +
            '<span class="second__caret"></span>'
        }, time)
      }
    } else {
      setTimeout(() => {
        document.querySelector('.second__caret').style.animationName = 'flash'
      }, time + 1)
    }
  })
}

const hasClosestByClassName = (element, className) => {
  let isClosest = false
  while (element && !isClosest && !element.classList.contains('navigation')) {
    if (element.classList.contains(className)) {
      isClosest = true
    } else {
      element = element.parentElement
    }
  }
  return isClosest && element
}

const getOS = () => {
  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform || ''
  const userAgentDataPlatform = window.navigator.userAgentData?.platform || ''
  const platformInfo = `${platform} ${userAgentDataPlatform}`
  if (/iPhone|iPad|iPod/.test(userAgent) ||
    (platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)) {
    return 'iOS'
  }
  if (/Android/.test(userAgent)) {
    return 'Android'
  }
  if (/Win|Windows/.test(platformInfo) || /Windows/.test(userAgent)) {
    return 'Windows'
  }
  if (/Mac|Macintosh/.test(platformInfo) || /Macintosh/.test(userAgent)) {
    return 'macOS'
  }
  if (/X11|Linux/.test(platformInfo) || /Linux/.test(userAgent)) {
    return 'Linux'
  }
  return 'Windows'
}

const getArchitecture = async () => {
  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform || ''
  const architectureInfo = `${userAgent} ${platform}`
  if (/arm64|aarch64/i.test(architectureInfo)) {
    return 'arm64'
  }
  if (/x86_64|x86-64|Win64|WOW64|amd64/i.test(architectureInfo)) {
    return 'amd64'
  }
  const userAgentData = window.navigator.userAgentData
  if (userAgentData?.getHighEntropyValues) {
    try {
      const highEntropyValues = await userAgentData.getHighEntropyValues(['architecture', 'bitness'])
      if (/arm/i.test(highEntropyValues.architecture)) {
        return 'arm64'
      }
      if (/x86|amd/i.test(highEntropyValues.architecture) || highEntropyValues.bitness === '64') {
        return 'amd64'
      }
    } catch {
      return null
    }
  }
  return null
}

const getStaticAssetPrefix = () => {
  const isLocalAssetPreview = window.location.protocol === 'file:' ||
    ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)
  if (!isLocalAssetPreview) {
    return 'https://b3log.org/siyuan/static/'
  }
  const isNestedAssetPage = window.location.pathname.includes('/en/') ||
    window.location.pathname.includes('/distributors/')
  return isNestedAssetPage ? '../../static/' : '../static/'
}

(function () {
  const staticAssetPrefix = getStaticAssetPrefix()
  const homeDownloadElement = document.querySelector('[data-home-download]')
  if (homeDownloadElement && !homeDownloadElement.dataset.homeDownloadInitialized) {
    homeDownloadElement.dataset.homeDownloadInitialized = 'true'
    const os = getOS()
    const baseHomeDownload = {
      Windows: {
        href: homeDownloadElement.dataset.windowsHref,
        icon: `${staticAssetPrefix}logo-windows.svg`,
        platform: homeDownloadElement.dataset.windowsPlatform,
      },
      macOS: {
        href: homeDownloadElement.dataset.macosHref,
        icon: `${staticAssetPrefix}logo-macos.svg`,
        platform: homeDownloadElement.dataset.macosPlatform,
      },
      Android: {
        href: homeDownloadElement.dataset.androidHref,
        icon: `${staticAssetPrefix}logo-android.svg`,
        platform: homeDownloadElement.dataset.androidPlatform,
      },
      Linux: {
        href: homeDownloadElement.dataset.linuxHref,
        icon: `${staticAssetPrefix}logo-linux.svg`,
        platform: homeDownloadElement.dataset.linuxPlatform,
      },
      iOS: {
        href: homeDownloadElement.dataset.iosHref,
        icon: `${staticAssetPrefix}logo-ios.svg`,
        platform: homeDownloadElement.dataset.iosPlatform,
      },
    }[os]
    const applyHomeDownload = (architecture) => {
      if (!baseHomeDownload) {
        return
      }
      const architectureKey = architecture === 'arm64' ? 'Arm64' : 'Amd64'
      const architectureDownload = ['Windows', 'macOS', 'Linux'].includes(os) && architecture
        ? {
            href: homeDownloadElement.dataset[`${os.toLowerCase()}${architectureKey}Href`],
            platform: homeDownloadElement.dataset[`${os.toLowerCase()}${architectureKey}Platform`],
          }
        : null
      const homeDownload = architectureDownload?.href
        ? { ...baseHomeDownload, ...architectureDownload }
        : baseHomeDownload
      homeDownloadElement.href = homeDownload.href
      homeDownloadElement.querySelector('[data-home-download-icon]').src = homeDownload.icon
      homeDownloadElement.querySelector('[data-home-download-icon]').alt = os
      homeDownloadElement.querySelector('[data-home-download-platform]').textContent = homeDownload.platform
    }
    applyHomeDownload()
    if (['Windows', 'macOS', 'Linux'].includes(os)) {
      getArchitecture().then(applyHomeDownload)
    }
  }

  const downloadElements = document.querySelectorAll('#download a')
  if (downloadElements.length > 0) {
    const os = getOS()
    const applyDownloadFilter = (architecture) => {
      downloadElements.forEach(item => {
        const itemArchitecture = item.getAttribute('data-architecture')
        const matchesOS = item.getAttribute('data-os') === os
        const matchesArchitecture = !itemArchitecture || !architecture || itemArchitecture === architecture
        item.style.display = matchesOS && matchesArchitecture ? 'inline-block' : 'none'
      })
    }
    applyDownloadFilter()
    if (['Windows', 'macOS', 'Linux'].includes(os)) {
      getArchitecture().then(applyDownloadFilter)
    }
  }

  if (!document.querySelector('.navigation')) {
    return
  }

  const observer = new IntersectionObserver((e) => {
    e.forEach(item => {
      if (item.isIntersecting) {
        item.target.classList.add('animate--in')
      } else {
        item.target.classList.remove('animate--in')
      }
    })
  }, {
    rootMargin: '-0% 0% -30% 0%',
    threshold: 0,
  })

  document.querySelectorAll('.animate').forEach(item => {
    observer.observe(item)
  })

  document.querySelector('.navigation').addEventListener('click', (event) => {
    const itemElement = hasClosestByClassName(event.target, 'item')
    if (itemElement) {
      document.querySelector('html').scrollTop = document.getElementById(
        itemElement.getAttribute('data-id')).offsetTop
    }
  })

  let initType = false
  const navigationElement = document.querySelector('.navigation')
  const block1Element = document.getElementById('block1')
  const block2Element = document.getElementById('block2')
  const blockImgElement = document.getElementById('blockImg')
  window.addEventListener('scroll', function () {
    const top = document.querySelector('html').scrollTop

    // type
    if (!initType && top > 214) {
      type()
      initType = true
    }

    // nav box-shadow
    if (top >= document.getElementById('feature1').offsetTop - 58) {
      navigationElement.classList.add('navigation--pin')
    } else {
      navigationElement.classList.remove('navigation--pin')
    }

    // nav select
    document.querySelectorAll('.navigation .item').forEach(item => {
      item.classList.remove('item--select')
    })
    if (top >= document.getElementById('feature1').offsetTop - 58 && top <
      document.getElementById('feature2').offsetTop - 58) {
      navigationElement.querySelector('.item[data-id="feature1"]').
        classList.
        add('item--select')
    } else if (top >= document.getElementById('feature2').offsetTop - 58 &&
      top <
      document.getElementById('feature3').offsetTop - 58) {
      navigationElement.querySelector('.item[data-id="feature2"]').
        classList.
        add('item--select')
    } else if (top >= document.getElementById('feature3').offsetTop - 58 &&
      top <
      document.getElementById('feature4').offsetTop - 58) {
      navigationElement.querySelector('.item[data-id="feature3"]').
        classList.
        add('item--select')
    } else if (top >= document.getElementById('feature4').offsetTop - 58 &&
      top <
      document.getElementById('feature5').offsetTop - 58) {
      navigationElement.querySelector('.item[data-id="feature4"]').
        classList.
        add('item--select')
    } else if (top >= document.getElementById('feature5').offsetTop - 58) {
      navigationElement.querySelector('.item[data-id="feature5"]').
        classList.
        add('item--select')
    }

    // 块级双链图片切换
    blockImgElement.src = `${staticAssetPrefix}feature3-1.png`
    if (top >= block1Element.offsetTop + block1Element.offsetParent.offsetTop +
      block1Element.clientHeight - 58 &&
      top < block2Element.offsetTop + block2Element.offsetParent.offsetTop +
      block2Element.clientHeight - 58) {
      blockImgElement.src = `${staticAssetPrefix}feature3-2.png`
    } else if (top >= block2Element.offsetTop +
      block2Element.offsetParent.offsetTop + block2Element.clientHeight - 58) {
      blockImgElement.src = `${staticAssetPrefix}feature3-3.png`
    }
  })
})()
