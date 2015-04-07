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
                    displayTextFields(satellite);
                }
            });            
        }
        
        function displayTextFields(satellite) {
            jQuery('[data-path]').each(function(index){
                var path = jQuery(this).data('path');
                
                var value = getProperty(satellite, path);
                
                if (value !== undefined) {
                    if (typeof value !== 'object') {
                        var dp = jQuery(this).data('dp');
                        if (dp !== undefined) {
                            value = value.toFixed(dp);
                        }                              

                        var type = jQuery(this).data('type');
                        if (type !== undefined) {
                            switch (type) {
                                case 'pos':
                                    value = MIAUTIL.convertDecDegLat(value, true);
                                    break;
                            }
                        }
                        
                        jQuery(this).html(value);    
                    } else {
                        var text = '';
                        var property = jQuery(this).data('prop');
                        var sep = jQuery(this).data('sep');
                        for (var i=0; i < value.length; i++) {
                            text += value[i][property];
                            if (i < value.length-1) {
                                text += sep;    
                            }    
                        }
                        jQuery(this).text(text);
                    }
                }
            }); 
        }
        
        function getProperty(obj, prop) {

            var parts = prop.split('.'),
                last = parts.pop(),
                l = parts.length,
                i = 1,
                current = parts[0];

            if (l == 0) {
                return obj[prop];
            }
            while((obj = obj[current]) && i < l) {
                current = parts[i];
                i++;
            }

            if(obj) {
                return obj[last];
            }
        } 
           
    return {
    
        render : function(data) {
            render(data);
        }
    }
}();