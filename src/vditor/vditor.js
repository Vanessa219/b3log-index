(function () {
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?3035c273d83b0b76e762b7397c790e84'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)

  if (typeof Vcomment === 'function') {
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
        const commentCntElement = document.getElementById('commentsCount')
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
  }

  const demoCodeElement = document.getElementById('vditorDemoCode')
  if (demoCodeElement) {
    if (demoCodeElement.textContent.trim() === '') {
      demoCodeElement.firstElementChild.firstElementChild.innerHTML = '  ' + document.getElementById(
        'vditorScript').textContent.trimLeft()
    }
    Vditor.highlightRender({lineNumber: true, enable: true}, demoCodeElement)
    Vditor.codeRender(demoCodeElement)
  }
})()
