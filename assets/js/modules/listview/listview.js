var miaview = function() {
    'use strict';

        function initView() {
            var table = '<div class="table-responsive">         \
                <table class="table small" id="listviewtable">  \
                    <thead>                                     \
                        <tr>                                    \
                            <th>satname</th>                    \
                            <th>visibility</th>                 \
                            <th>azimuth</th>                    \
                            <th>Ele</th>                        \
                            <th>Lat</th>                        \
                            <th>Lon</th>                        \
                            <th>Alt</th>                        \
                            <th>Vel.</th>                       \
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
               jQuery('<tr>', {'id': 'listview' + satellite.catnum }).html(
                    jQuery('td').text(item.rank),
                    jQuery('td').text(item.content),
                    jQuery('td').text(item.UID)
                ).appendTo('#records_table');
                                                                                                                        
                    }
    table += '            <tr>                   \
                <td>' + satellite.satname + '</td>                 \
                <td>' + satellite.visibility + '</td>            \
                <td>' + satellite.azimuth.toFixed(2) + '</td>                \
                <td>' + satellite.elevation.toFixed(2) + '</td>                \
                <td>' + MIAUTIL.convertDecDegLat(satellite.latitude) + '</td>           \
                <td>' + MIAUTIL.convertDecDegLon(satellite.longitude) + '</td>           \
                <td>' + satellite.altitude.toFixed(2) + '</td>           \          \
                <td>' + satellite.velocity.toFixed(2) + '</td>           \          \           \
            </tr>';
    }
});           


table += '        </tbody>\
      </table>\
    </div>';

               
        }
        
    return {
        
        updateInfo: true,
    
        render : function(data) {
            render(data);
        },
        
        init: function() {
            initView();
        }
    }
}();