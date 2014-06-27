
/* This is the messenger system that the app uses to communicate between modules
  =================================================== */

define([], function () {

  "use strict";

  var Topics = function () {
    var $callbacks = $.Callbacks();
    return {
      publish : $callbacks.fire,
      unsubscribe : $callbacks.remove,
      setSubscriptions : function (options) {
        $callbacks.add(function (event, props, callback) {

          var components = event.split(':'),
                moduleName = components[0],
                eventName = components[1];

          props = props === undefined ? {} : props;
          callback = callback === undefined ? function () {} : callback;

          if(moduleName === options.name) {
            if (typeof options.events[eventName] === 'function') {
              options.events[eventName](props);
            } else {
              console.log('%c There is no ' + options.name + ' event ' + eventName + ' ', 'background: #FF0000; color: #FFFFFF');
            }
          }
          callback();
        });
      }
    };
  };

  return new Topics();

});