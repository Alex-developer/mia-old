var MIABOOTSTRAP = function() {
    'use strict';

        function initWorkers() {
            if (Modernizr.webworkers) {
            } else {
            }            
        }   
         
    return {
    
        run : function() {
            initWorkers();
        }
    }
};

jQuery(document).ready(function() {
    'use strict';   

    var bootstrap = new MIABOOTSTRAP();
    bootstrap.run();
});