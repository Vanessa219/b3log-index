const addScript = (path, callback) => {
  const scriptElement = document.createElement('script')
  scriptElement.src = path
  scriptElement.async = true
  document.head.appendChild(scriptElement)
  scriptElement.onload = () => {
    callback()
  }
}

const addStyle = (url) => {
  const styleElement = document.createElement('link')
  styleElement.rel = 'stylesheet'
  styleElement.type = 'text/css'
  styleElement.href = url
  document.getElementsByTagName('head')[0].appendChild(styleElement)
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

addStyle('https://cdn.jsdelivr.net/npm/vditor@3.4.1/dist/index.css')
document.addEventListener('DOMContentLoaded', function () {
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?3035c273d83b0b76e762b7397c790e84'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)

  if (document.getElementById('vditorComments')) {
    addScript('https://cdn.jsdelivr.net/npm/vditor@3.4.1/dist/index.min.js',
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

  const dynamicElement = document.getElementById('dynamic')
  if (dynamicElement) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://hacpai.com/api/v2/articles/tag/vditor?p=1')
    xhr.withCredentials = true
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const responseJSON = JSON.parse(xhr.responseText)
          const articles = responseJSON.data.articles
          if (responseJSON.code !== 0 || 0 === articles.length) {
            dynamicElement.innerHTML = '无新闻'
            dynamicElement.style.backgroundImage = 'none'
            return
          }

          let listHTML = '<ul class="fn-list">'
          for (var i = 0; i < articles.length; i++) {
            const article = articles[i]
            listHTML += '<li>'
              + '<a target=\'_blank\' href=\'' + article.articlePermalink +
              '\'>'
              + article.articleTitle + '</a>&nbsp;<small class="ft-fade">[' +
              article.cmtTimeAgo
              + ']</small></li>'
          }
          listHTML += '</ul>'
          dynamicElement.innerHTML = listHTML
          dynamicElement.style.backgroundImage = 'none'
        } else {
          dynamicElement.innerHTML = '加载列表失败 :-('
          dynamicElement.style.backgroundImage = 'none'
        }
      }
    }
    xhr.send()
  }
})
