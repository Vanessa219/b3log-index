const addScript = (path, callback) => {
  const scriptElement = document.createElement('script')
  scriptElement.src = path
  scriptElement.async = true
  document.head.appendChild(scriptElement)
  scriptElement.onload = () => {
    callback()
  }
}

const updateCode = (btnElement, code) => {
  if (btnElement.classList.contains('btn--red')) {
    return
  } else {
    const redBtnElement = document.querySelector('.btn--red')
    if (redBtnElement) {
      redBtnElement.classList.remove('btn--red')
    }
    btnElement.classList.add('btn--red')
  }

  const demoCodeElement = document.getElementById('vditorDemoCode')
  demoCodeElement.firstElementChild.innerHTML = `<code>${code}
</code>`
  Vditor.highlightRender({lineNumber: true, enable: true}, demoCodeElement)
  Vditor.codeRender(demoCodeElement)
}

document.addEventListener('DOMContentLoaded', function () {
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?3035c273d83b0b76e762b7397c790e84'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)

  if (document.getElementById('vditorComments')) {
    addScript('https://cdn.jsdelivr.net/npm/vditor@3.3.2/dist/index.min.js',
      () => {
        const demoCodeElement = document.getElementById('vditorDemoCode')
        if (demoCodeElement) {
          Vditor.highlightRender({lineNumber: true, enable: true},
            demoCodeElement)
          Vditor.codeRender(demoCodeElement)
        }
        if (typeof vditorScript !== 'undefined') {
          vditorScript()
        }
        addScript('https://cdn.jsdelivr.net/npm/vcmt@latest/dist/index.min.js',
          () => {
            const vcomment = new Vcomment({
              id: 'vditorComments',
              postId: '1549638745630',
              url: 'https://hacpai.com',
              userName: 'Vanessa',
              currentPage: 1,
              vditor: {
                hljsEnable: true,
                hljsStyle: 'github',
              },
              after () {
                const commentCntElement = document.getElementById(
                  'commentsCount')
                document.getElementById(
                  'commentCnt').innerText = commentCntElement.innerText + ' 个讨论'
                commentCntElement.nextSibling.remove()
                commentCntElement.remove()
              },
              error () {
                document.getElementById('comments').remove()
              },
            })

            vcomment.render()
          })
      })
  }
})
