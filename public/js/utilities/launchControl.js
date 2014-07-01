define(function () {

  return function (options) {
    var methodCounter = 0,
          self = this;

    function invokeMethod () {
      if(options.initMethods[methodCounter]) {
        var method = options.initMethods[methodCounter]['method'],
              $dfd = new $.Deferred();

        $.when($dfd.promise(method($dfd, self))).then(function () {
          methodCounter+=1;
          invokeMethod();
        });
      } else {
        if(typeof options.launch !== 'function') {
          console.log('%c launch callback is required to start ', 'background: #FF0000; color: #FFFFFF');
          return;
        }
        options.launch();
      }
    }
    invokeMethod();
  };

});