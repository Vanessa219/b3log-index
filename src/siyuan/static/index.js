const type = () => {
  const typeElement = document.querySelector('#slogan')
  const texts = [
    '随时随地离线可用',
    '端到端加密保证隐私安全',
    '优雅的 Markdown 编辑体验',
    '文字创作时沉浸在内容构思中',
    '触摸灵感和思绪的清晰脉络',
    '将知识碎片构建成结构化的体系',
    '找到那些埋藏在记忆深处的灵犀',
    '思源有云，往来随心',
  ]
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
  const appVersion = navigator.appVersion
  if (appVersion.indexOf('Win') !== -1) {
    return 'Windows'
  }
  if (appVersion.indexOf('Mac') !== -1) {
    return 'macOS'
  }
  if (appVersion.indexOf('X11') !== -1 || appVersion.indexOf('Linux') !== -1) {
    return 'Linux'
  }
  if (/Android/.test(window.navigator.userAgent)) {
    return 'Android'
  }
  return 'Windows'
}

(function () {
  const downloadElements = document.querySelectorAll('#download a')
  if (downloadElements.length > 0) {
    const os = getOS()
    downloadElements.forEach(item => {
      if (item.getAttribute('data-os') === os) {
        item.style.display = 'inline-block'
      } else {
        item.style.display = 'none'
      }
    })
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
    blockImgElement.src = 'https://cdn.jsdelivr.net/gh/vanessa219/b3log-index@281865031d2c96830167146607a9be37bb54e2db/src/siyuan/static/feature3-1.png'
    if (top >= block1Element.offsetTop + block1Element.offsetParent.offsetTop +
      block1Element.clientHeight - 58 &&
      top < block2Element.offsetTop + block2Element.offsetParent.offsetTop +
      block2Element.clientHeight - 58) {
      blockImgElement.src = 'https://cdn.jsdelivr.net/gh/vanessa219/b3log-index@281865031d2c96830167146607a9be37bb54e2db/src/siyuan/static/feature3-2.png'
    } else if (top >= block2Element.offsetTop +
      block2Element.offsetParent.offsetTop + block2Element.clientHeight - 58) {
      blockImgElement.src = 'https://cdn.jsdelivr.net/gh/vanessa219/b3log-index@281865031d2c96830167146607a9be37bb54e2db/src/siyuan/static/feature3-3.png'
    }
  })
})()
