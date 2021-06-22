const type = () => {
  const typeElement = document.querySelector('#slogan')
  const texts = [
    '我们需要随时随地离线可用',
    '我们需要端到端加密带来完全的隐私安全',
    '我们需要优雅的 Markdown 编辑体验',
    '我们需要在文字创作时沉浸在内容构思中',
    '我们需要看到灵感和思绪的清晰脉络',
    '我们需要将知识碎片构建成结构化的体系',
    '我们需要找到那些埋藏在记忆深处的灵犀',
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
      time += 1500
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
};

(function () {
  document.getElementById('changeTOzh').addEventListener('click', function () {
    localStorage.setItem('language', 'zh')
    window.location.href = this.getAttribute('data-href')
  })
  if (0 > navigator.language.indexOf('zh') &&
    localStorage.getItem('language') !== 'zh') {
    window.location.href = 'en'
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
    // https://cdn.jsdelivr.net/gh/vanessa219/b3log-index@d24edc526ee2486c082273f93c79a7e92cc79134/src/siyuan/images/3-4.png
    // https://cdn.jsdelivr.net/gh/vanessa219/b3log-index@d24edc526ee2486c082273f93c79a7e92cc79134/src/siyuan/images/bg1.png
  })
})()
