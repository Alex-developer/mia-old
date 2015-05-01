var miaview = function() {
    'use strict';

    var name = '3D View';
            
    var _viewer;
    
   var url = '/assets/models/tiefighter/tie_fighter.gltf';
    //var url = '/assets/models/uhfsat/uhfsat.gltf';
    var _position;
    var _orientation;
    var heading = Cesium.Math.toRadians(0);
    var pitch = 0;
    var roll = 0;

    
    var entity;
    
    function makeDescription(satellite) {
        var html = '<table><tr><th>#</th><th>AOS</th><th>LOS</th></tr>';
        jQuery.each(satellite.passes, function(key, value){
            html += '<tr>';
            html += '<td>' + value.passNo + '</td>';
            html += '<td>' + value.dateTimeStart + '</td>';
            html += '<td>' + value.dateTimeEnd + '</td>';
            html += '</tr>';
        });
        html += '</table>';
        return html;    
    }
    
        function render(data) {
            jQuery.each(data, function( index, satellite ) {
                var catalogNumber = satellite.catnum;
                if (satellite.calculate) {
                    var lat = satellite.latitude;
                    var lon = satellite.longitude;
                    var alt = satellite.altitude;
                    _position = Cesium.Cartesian3.fromDegrees(lon, lat, alt*1000);    
                    _orientation = Cesium.Transforms.headingPitchRollQuaternion(_position, heading, pitch, roll);
                    var entity = _viewer.entities.getById(catalogNumber);
                    if (entity === undefined) {
                        entity = _viewer.entities.add(
                        {
                            id: catalogNumber,
                            description: makeDescription(satellite),
                            name : satellite.name,
                            position : _position,
                            orientation : _orientation,
                            model : {
                                uri : url,
                                minimumPixelSize : 32,
                                scale: 1
                            }
                        });                        
    console.log('added ' + catalogNumber);                    

                    } else {
                        entity.position = _position;
                    }  
                    
                    updateOrbit(satellite);                      
                } else {
                    _viewer.entities.removeById(catalogNumber);
                    _viewer.entities.removeById(satellite.catnum + 'orbit');
                }
            });             
        }

        function updateOrbit(satellite) {
            var orbit = satellite.orbit;
            var orbitId = satellite.catnum + 'orbit';
            
            var entity = _viewer.entities.getById(orbitId);
            if (entity === undefined) {
                
                var points = [];
                jQuery.each(orbit, function(key, value){
                    points.push(
                        Cesium.Cartesian3.fromDegrees(value.longitude, value.latitude, value.altitude*1000)
                    );   
                });
                
                
                entity = _viewer.entities.add({
                    polyline : {
                        id: orbitId,
                        positions : points,
                        width : 1,
                        followSurface : false,
                        material : Cesium.Color.RED
                    }                    
                });
            }            
            
        }
        
        function initView() {
            _viewer = new Cesium.Viewer('cesiumContainer', {
                timeline: false,
                navigationHelpButton: false,
                fullscreenButton: false,
                homeButton: false,
                sceneModePicker: false,
                geocoder: false,
                clock: undefined,
                animation: false,
                baseLayerPicker : false,
                //Use OpenStreetMaps
                //imageryProvider : new Cesium.OpenStreetMapImageryProvider({
                 //   url : '//a.tile.openstreetmap.org/'
               // }),
                // Use high-res stars downloaded from https://github.com/AnalyticalGraphicsInc/cesium-assets
                
                
                /*skyBox : new Cesium.SkyBox({
                    sources : {
                      positiveX : '/assets/images/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_px.jpg',
                      negativeX : '/assets/images/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mx.jpg',
                      positiveY : '/assets/images/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_py.jpg',
                      negativeY : '/assets/images/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_my.jpg',
                      positiveZ : '/assets/images/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_pz.jpg',
                      negativeZ : '/assets/images/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mz.jpg'
                    }
                }),*/
                
                skyBox : new Cesium.SkyBox({
                    sources : {
                      positiveX : '/assets/images/stars/spacebook/Version2_dark_px.jpg',
                      negativeX : '/assets/images/stars/spacebook/Version2_dark_mx.jpg',
                      positiveY : '/assets/images/stars/spacebook/Version2_dark_py.jpg',
                      negativeY : '/assets/images/stars/spacebook/Version2_dark_my.jpg',
                      positiveZ : '/assets/images/stars/spacebook/Version2_dark_pz.jpg',
                      negativeZ : '/assets/images/stars/spacebook/Version2_dark_mz.jpg'
                    }
                }),                
                
                // Show Columbus View map with Web Mercator projection
                mapProjection : new Cesium.WebMercatorProjection()
            });

            var terrainProvider = new Cesium.CesiumTerrainProvider({
                url : '//assets.agi.com/stk-terrain/world',
                requestVertexNormals: true,
                requestWaterMask: true
            });
            _viewer.terrainProvider = terrainProvider;
            _viewer.scene.globe.enableLighting = true; 
            _viewer.scene.moon = new Cesium.Moon();
            
            resize();   
            

           // _viewer.extend(Cesium.viewerCesiumInspectorMixin);  
            
            jQuery('#viewoptions').on('click','.3dviewchange', function(e){
                var newMode = jQuery(this).data('view');
                switch (newMode) {
                    case '3d':
                        _viewer.scene.morphTo3D(); 
                        break;
                        
                    case '2d':
                        _viewer.scene.morphTo2D(); 
                        break;

                    case 'columbus':
                        _viewer.scene.morphToColumbusView(); 
                        break;
                    
                }    
            });        
        }   
        
        function initViewOptions() {
            
        }
        
        function resize(width, height) {            
            if (typeof width === 'undefined' || typeof height === 'undefined') {
                var parent = jQuery('#cesiumContainer');
                width = parent.width();
                height = parent.height();
            }

            _viewer.forceResize ();
            return;
            
            if (width !== 0 && height !== 0) {
                _viewer.canvas.width = width-30;
                _viewer.canvas.height = height-30;

                _viewer.scene.camera.frustum.aspectRatio = width / height;
            }          
        }
        
        jQuery(window).resize(function(){
            resize();
        });
                 
    return {
        updateInfo: true,
    
        viewName: name,
                
        init : function() {
            initView();    
        },
        
        render : function(data) {
            render(data);
        }
    }
}();