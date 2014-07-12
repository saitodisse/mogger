
(function(root) {
  'use strict';
  
  var simpleObj = {
    methodA: function() {},
    methodB: function() {}
  };

  var tracer = new root.Mogger.Tracer({
    enabled: true,
    showPause: true,

    //-------------------------------------------------------
    // global config
    //-------------------------------------------------------
    before: {
      //css: 'color: blue',
      size: 15
    },
    targetConfig: {
      //css: 'color: red',
      size: 45
    },

    showArguments: true,

      //-------------------------------------------------------
      // interceptors
      //-------------------------------------------------------
      interceptors: [
        {
          filterRegex: /^(methodA)/i,
          callback: function(info) {
            return 'intercepted -> ' + info.method + '(' + info.args[0] + ', ' + info.args[1] + ')';
          }
        }
      ]
  });

  tracer.traceObj({
    before: { message: 'simpleObj', css: 'color: #A42' },
    target: simpleObj, targetConfig: {  css: 'color: #E42' }
  });


  root.simpleObj = simpleObj;

})(this);