var MIABOOTSTRAP = function() {
    'use strict';

        function initWorkers() {
            if (Modernizr.webworkers) {
                
var worker = new Worker('/assets/js/engine/predictlib.js');

worker.addEventListener('message', function(e) {
 // console.log('Worker result: ', e.data);
  
 // miaview.render(JSON.parse(e.data));
}, false);

worker.postMessage('start');
                
            } else {
            }            
        }   
         
        function getPosition(options) {
            var deferred = $.Deferred();
    
            navigator.geolocation.getCurrentPosition(
                deferred.resolve,
                deferred.reject,
                options);

            return deferred.promise();
        };

    return {
    
        run : function() {
            initWorkers();
            getPosition().then(function(e){
            });
        }
    }
};

jQuery(document).ready(function() {
    'use strict';   

    var bootstrap = new MIABOOTSTRAP();
    bootstrap.run();
});