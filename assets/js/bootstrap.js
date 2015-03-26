var MIABOOTSTRAP = function() {
    'use strict';

        function initWorkers() {
            if (Modernizr.webworkers) {
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
                debugger;
            });
        }
    }
};

jQuery(document).ready(function() {
    'use strict';   

    var bootstrap = new MIABOOTSTRAP();
    bootstrap.run();
});