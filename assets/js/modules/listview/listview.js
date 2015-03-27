var miaview = function() {
    'use strict';

        function render(data) {
 
           
var table = '<div class="table-responsive"> \
      <table class="table small">            \
        <thead>                               \
            <tr>                               \
                <th></th>                       \
                <th>satname</th>                    \
                <th>Type</th>                     \
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
        
jQuery.each(data, function( index, value ) {
    table += '            <tr>                   \
                <td>' + (index+1) + '</td>                      \
                <td>' + value.satname + '</td>                 \
                <td>' + value.mode + '</td>                 \
                <td>' + value.visibility + '</td>            \
                <td>' + value.azimuth.toFixed(2) + '</td>                \
                <td>' + value.elevation.toFixed(2) + '</td>                \
                <td>' + value.latitude.toFixed(2) + '</td>           \
                <td>' + value.longitude.toFixed(2) + '</td>           \
                <td>' + value.altitude.toFixed(2) + '</td>           \          \
                <td>' + value.velocity.toFixed(2) + '</td>           \          \           \
            </tr>';
});           


table += '        </tbody>\
      </table>\
    </div>';

jQuery('#listtable').html(table);                
        }
        
    return {
    
        render : function(data) {
            render(data);
        }
    }
}();