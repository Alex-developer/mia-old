var miaview = function() {
    'use strict';

        var name = 'List View';
        
        function initView() {
            var table = '<table class="table" id="listviewtable" width="100%">  \
                    <thead>                                     \
                        <tr>                                    \
                            <th>Name</th>                       \
                            <th>visibility</th>                 \
                            <th>Azimuth</th>                    \
                            <th>Elevation</th>                  \
                            <th>Latitude</th>                   \
                            <th>Longitude</th>                  \
                            <th>Altitude</th>                   \
                            <th>Next Event</th>                 \
                        </tr>                                   \
                    </thead>                                    \
                </table>                                        \
            ';
            
            jQuery('#listtable').html(table);                          
        }
        
        function render(data) {
            var renderedSomething = false;
            
            jQuery.each(data, function( index, satellite ) {
    
                if (satellite.calculate) {
                    if (jQuery('#listview' + satellite.catnum ).length === 0) {
                       var tr = jQuery('<tr>', {id: 'listview' + satellite.catnum }).append(
                            jQuery('<td>',{class: 'catname'}).text('aa'),
                            jQuery('<td>',{class: 'visibility'}),
                            jQuery('<td>',{class: 'azimuth'}),
                            jQuery('<td>',{class: 'elevation'}),
                            jQuery('<td>',{class: 'latitude'}),
                            jQuery('<td>',{class: 'longitude'}),
                            jQuery('<td>',{class: 'altitude'}),
                            jQuery('<td>',{class: 'nextevent'})
                        ).appendTo('#listviewtable');
                    }
                    
                    jQuery('#listview' + satellite.catnum + ' .catname').text(satellite.satname);
                    jQuery('#listview' + satellite.catnum + ' .visibility').text(satellite.visibility);
                    jQuery('#listview' + satellite.catnum + ' .azimuth').text(satellite.azimuth.toFixed(2));
                    jQuery('#listview' + satellite.catnum + ' .elevation').text(satellite.elevation.toFixed(2));
                    jQuery('#listview' + satellite.catnum + ' .latitude').html(MIAUTIL.convertDecDegLat(satellite.latitude, true));
                    jQuery('#listview' + satellite.catnum + ' .longitude').html(MIAUTIL.convertDecDegLat(satellite.lng, true));
                    jQuery('#listview' + satellite.catnum + ' .altitude').text(satellite.altitude.toFixed(2));                    
                    jQuery('#listview' + satellite.catnum + ' .nextevent').text(''); 
                    
                    renderedSomething = true;                   
                } else {
                    if (jQuery('#listview' + satellite.catnum).length !== 0) {
                        jQuery('#listview' + satellite.catnum).remove();
                    }                    
                }
            });
            
            if (renderedSomething) {
                jQuery('#nosats').hide();
            } else {
                jQuery('#nosats').show();
            }          
        }
        
    return {
        
        updateInfo: true,
    
        viewName: name,
            
        render : function(data) {
            render(data);
        },
        
        init: function() {
            initView();
        }
    }
}();