var miaview = function() {
    'use strict';

        var name = 'List View';
        
        function initView() {
            var table = '<table class="table" id="listviewtable">  \
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
                    jQuery('#listview' + satellite.catnum + ' .longitude').html(MIAUTIL.convertDecDegLat(satellite.longitude, true));
                    jQuery('#listview' + satellite.catnum + ' .altitude').text(satellite.altitude.toFixed(2));                    
                    jQuery('#listview' + satellite.catnum + ' .nextevent').text('');                    
                } else {
                    if (jQuery('#listview' + satellite.catnum).length !== 0) {
                        jQuery('#listview' + satellite.catnum).remove();
                    }                    
                }
            });           
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