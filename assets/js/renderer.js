var MIARENDERER = function() {
    'use strict';

        function render(data) {
            
            if (miaview.render !== undefined) {
                miaview.render(data);   
            } 
            
            if (miaview.updateInfo !== undefined) {
                if (miaview.updateInfo) {
                    updateInfo(data);    
                }
            }
        }
        
        function updateInfo(data) {
            jQuery.each(data, function( index, satellite ) {
                if (satellite.calculate) {    
               
                    jQuery('#noradid').html(satellite.catnum);
                    jQuery('#name').html(satellite.name);
                    
                    jQuery('#latitude').html(satellite.latitude);
                    jQuery('#longitude').html(satellite.longitude);
                    jQuery('#locator').html(satellite.locator);
                    jQuery('#doppler').html(satellite.dopplershift.toFixed(2));
                    jQuery('#loss').html(satellite.signalloss.toFixed(2));
                    jQuery('#delay').html(satellite.signaldelay.toFixed(2));
                }
            });            
        }
        
    return {
    
        render : function(data) {
            render(data);
        }
    }
}();