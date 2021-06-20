const type = () => {
  const typeElement = document.querySelector('#slogan')
  const texts = [
    '我们需要优雅的 Markdown 编辑体验',
    '我们需要在文字创作时沉浸在内容构思中',
    '我们需要看到灵感和思绪的清晰脉络',
    '我们需要将知识碎片构建成结构化的体系',
    '我们需要离线使用带来完全的隐私安全',
    '我们需要找到那些埋藏在记忆深处的灵犀',
  ]
  let textLength = 0
  let time = 0
  texts.forEach((text, i) => {
    if (i > 0) {
      textLength += text[i - 1].length + 20
    }
    for (let j = 0; j < text.length; j++) {
      time += 200
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

  let initType = false
  window.addEventListener('scroll', function () {
    const top = document.querySelector('html').scrollTop
    if (!initType && top > 214) {
      type()
      initType = true
    }
  })
})()
