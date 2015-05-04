var miaview = function() {
    'use strict';

    var name = 'Passes View';
    var _viewReady = false;
    
    function loadViews() {
        var controllerFile = '/assets/js/views/azel/azel.js';
        jQuery.getScript(controllerFile).done(function(e){
            _viewReady = true;
        });
    }
    
    function render(data) {
        if (_viewReady) {
            
        }
    }   
            
    return {
        viewName: name,
        
        updateInfo: false,
                
        render : function(data) {
            render(data)
        },
        
        init : function() {
            loadViews();
        }
    }
}();