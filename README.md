#browserSwipe.js

This is a simple tool to allow for trackpad swipe events when you have disabled scrolling on your site.

###Demo:

[Check it out in use here](http://thekenwheeler.herokuapp.com)

###How to disabled scrolling:

    html, body {
      height: 100%;
      overflow: hidden;
    }

Rather than linear scrolling, this listens for a mousewheel event, and treats scrolling up or down like a swipe event on a mobile device.

###How to use:

    $.browserSwipe({
      up: function({
        // Do something when they swipe up
      }),
      down: function({
        // Do something when they swipe down
      })
    });

###Example:

    $.browserSwipe({
      up: function(){
        slideHandle('up');
      },
      down: function(){
        slideHandle('down');
      }
    });

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