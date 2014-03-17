(function($){

  $.browserSwipe = function(options) {

    var listening = true;
    var checkDelta = false;

    var defaults = {
      up: function(){ console.log('up') },
      down: function(){ console.log('down') }
    }

    var settings = $.extend(defaults, options);

    function _constructor() {
      _bindEvents();
    }

    function _bindEvents() {
      $(window).on('mousewheel', _throttle(_checkSwipe, 250));
      $(window).on('DOMMouseScroll', _throttle(_checkSwipe, 250));
    }

    function _throttle(fn, threshhold, scope) {
      threshhold || (threshhold = 250);
      var last,
          deferTimer;
      return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
          // hold on to it
          clearTimeout(deferTimer);
          deferTimer = setTimeout(function () {
            last = now;
            fn.apply(context, args);
          }, threshhold);
        } else {
          last = now;
          fn.apply(context, args);
        }
      };
    }

    function _checkSwipe(event){
      if(listening == true){
        if(checkDelta == false) {
          setTimeout(function(){
            listening = false;
            checkDelta = true;
          },100);
        }
      } else {
        if(checkDelta == true) {
          if((event.originalEvent.wheelDeltaY ? (event.originalEvent.wheelDeltaY > 0) : (event.originalEvent.detail) < 0)) {
            settings.up.call();
          } else {
            settings.down.call();
          }
          checkDelta = false;
          setTimeout(function(){
            listening = true;
          }, 1000);
        }
      }
    }

    return _constructor();

  };

})(jQuery);