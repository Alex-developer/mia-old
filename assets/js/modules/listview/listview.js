var miaview = function() {
    'use strict';

        function render(data) {
 
           
var table = '<div class="table-responsive"> \
      <table class="table small">            \
        <thead>                               \
            <tr>                               \
                <th></th>                       \
                <th>satname</th>                    \
                <th>visibility</th>                       \
                <th>azimuth</th>                         \
                <th>Ele</th>                         \
                <th>Lat</th>                          \
                <th>Lon</th>                           \
                <th>Alt</th>                            \
                <th>Vel.</th>                            \
            </tr>                                          \
        </thead>                                            \
        <tbody>                                              \
        '; 
        
jQuery.each(data, function( index, satellite ) {
    
    if (satellite.calculate) {
    table += '            <tr>                   \
                <td>' + (index+1) + '</td>                      \
                <td>' + satellite.satname + '</td>                 \
                <td>' + satellite.visibility + '</td>            \
                <td>' + satellite.azimuth.toFixed(2) + '</td>                \
                <td>' + satellite.elevation.toFixed(2) + '</td>                \
                <td>' + satellite.latitude.toFixed(2) + '</td>           \
                <td>' + satellite.longitude.toFixed(2) + '</td>           \
                <td>' + satellite.altitude.toFixed(2) + '</td>           \          \
                <td>' + satellite.velocity.toFixed(2) + '</td>           \          \           \
            </tr>';
    }
});           


table += '        </tbody>\
      </table>\
    </div>';

jQuery('#listtable').html(table);                
        }
        
    return {
        
        updateInfo: true,
    
        render : function(data) {
            render(data);
        }
    }
}();