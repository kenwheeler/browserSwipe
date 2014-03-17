var app = (function(app, $){

  var currentScene = 0;

  $cache = {
    scenes: $('.scene')
  }

  function _constructor(){
    _bindEvents();
  }

  function _bindEvents(){
    $('body').swipe({
      swipe: function(event,direction) {
        if(direction == 'up') {
          slideHandle('down');
        } else if(direction == 'down') {
          slideHandle('up');
        }
      }
    });
    $('body, a, iframe').on('touchmove',function(e){
      e.stopPropagation();
      e.preventDefault();
    });
    $('a, iframe').on('mouseenter',function(e){
      e.stopPropagation();
      e.preventDefault();
    });
    $.browserSwipe({
      up: function(){
        slideHandle('up');
      },
      down: function(){
        slideHandle('down');
      }
    });
  }

  function slideHandle(direction) {
    switch(direction) {
      case 'up':
        if(currentScene > 0) {
          currentScene--;
          sceneHandle();
        }
      break;
      case 'down':
        if(currentScene < ($cache.scenes.length - 1)) {
          currentScene++;
          sceneHandle();
        }
      break;
    }
  }

  function sceneHandle(){
    $cache.scenes.each(function(){
      if($(this).index() == currentScene) {
        $(this).addClass('active').removeClass('after');
      } else if($(this).index() < currentScene){
        $(this).addClass('after').removeClass('active');
      } else {
        $(this).removeClass('after').removeClass('active');
      }
    });
  }

  return _constructor;

})(window.app || {}, jQuery)

$(document).ready(function(){
  app();
});