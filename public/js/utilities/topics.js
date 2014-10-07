
define(function () {

  "use strict";

  var Topics = function () {
    var $callbacks = $.Callbacks();
    return {
      publish : $callbacks.fire,
      unsubscribe : $callbacks.remove,
      setSubscriptions : function (options, context) {

        if(!context) {
          console.log('%c You need to pass a context for ' + options.channel + ' ', 'background: #FF0000; color: #FFFFFF');
          return;
        }

        $callbacks.add(function (event, props, callback) {

          var components = event.split(':'),
                moduleName = components[0],
                eventName = components[1];

          props = props === undefined ? {} : props;
          callback = callback === undefined ? function () {} : callback;

          if(moduleName === options.channel) {
            if (typeof options.events[eventName] === 'function') {
              options.events[eventName].call(context, props);
            } else {
              console.log('%c There is no ' + options.channel + ' event ' + eventName + ' ', 'background: #FF0000; color: #FFFFFF');
            }
          }
          callback();
        });
      }
    };
  };

  return new Topics();

});