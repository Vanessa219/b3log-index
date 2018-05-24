(function () {
  // baidu
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?f17557e022686a8ff2a6d32403393093";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);

  if (typeof $ === 'undefined') {
    return
  }

  if($('.first-screen').length === 1) {
    // first screen
    $('.first-screen').height($(window).height());

    $('.first-screen .panel').height($(window).height() - 66);

    // scroll
    $(window).scroll(function () {
      if ($('body').height() < $(window).height() * 2 + $('.header').outerHeight()) {
        return;
      }
      if ($(window).scrollTop() > $(window).height()) {
        $('.header').addClass('header-fixed');
        $('.first-screen .required').css('padding-top', '116px')
        $('.header-a').removeClass('current header-a-first');
      } else {
        $('.header').removeClass('header-fixed');
        $('.first-screen .required').css('padding-top', '50px')
        $('.header-a').addClass('current header-a-first');
      }
    });
  }

  // canvas bg
  var container;
  var camera, scene, renderer, particle;
  var mouseX = 0, mouseY = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  init();
  animate();

  function init() {

    container = document.getElementById( 'firstCanvas' );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x3b3e43 );

    var material = new THREE.SpriteMaterial( {
      map: new THREE.CanvasTexture( generateSprite() ),
      blending: THREE.AdditiveBlending
    } );

    for ( var i = 0; i < 1000; i++ ) {

      particle = new THREE.Sprite( material );

      initParticle( particle, i * 10 );

      scene.add( particle );
    }

    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );

    //

    window.addEventListener( 'resize', onWindowResize, false );

  }

  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function generateSprite() {

    var canvas = document.createElement( 'canvas' );
    canvas.width = 16;
    canvas.height = 16;

    var context = canvas.getContext( '2d' );
    var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
    gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
    gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
    gradient.addColorStop( 0.4, 'rgba(0,0,64,1)' );
    gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

    context.fillStyle = gradient;
    context.fillRect( 0, 0, canvas.width, canvas.height );

    return canvas;

  }

  function initParticle( particle, delay ) {

    var particle = this instanceof THREE.Sprite ? this : particle;
    var delay = delay !== undefined ? delay : 0;

    particle.position.set( 0, 0, 0 );
    particle.scale.x = particle.scale.y = Math.random() * 32 + 16;

    new TWEEN.Tween( particle )
    .delay( delay )
    .to( {}, 10000 )
    .onComplete( initParticle )
    .start();

    new TWEEN.Tween( particle.position )
    .delay( delay )
    .to( { x: Math.random() * 4000 - 2000, y: Math.random() * 1000 - 500, z: Math.random() * 4000 - 2000 }, 10000 )
    .start();

    new TWEEN.Tween( particle.scale )
    .delay( delay )
    .to( { x: 0.01, y: 0.01 }, 10000 )
    .start();

  }

  //

  function onDocumentMouseMove( event ) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  function onDocumentTouchStart( event ) {

    if ( event.touches.length == 1 ) {

      event.preventDefault();

      mouseX = event.touches[ 0 ].pageX - windowHalfX;
      mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

  }

  function onDocumentTouchMove( event ) {

    if ( event.touches.length == 1 ) {

      event.preventDefault();

      mouseX = event.touches[ 0 ].pageX - windowHalfX;
      mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

  }

  //

  function animate() {

    requestAnimationFrame( animate );

    render();
  }

  function render() {

    TWEEN.update();

    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
    camera.lookAt( scene.position );

    renderer.render( scene, camera );

  }
})();