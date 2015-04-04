var miaview = function() {
    'use strict';

    var _viewer;
    
        function render(data) {
             
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

         /*   var terrainProvider = new Cesium.CesiumTerrainProvider({
                url : '//assets.agi.com/stk-terrain/world',
                requestVertexNormals: true,
                requestWaterMask: true
            });
            _viewer.terrainProvider = terrainProvider;*/
            _viewer.scene.globe.enableLighting = true; 
            _viewer.scene.moon = new Cesium.Moon();
            
            resize();   
        }   
        
        function initViewOptions() {
            
        }
        
        function resize(width, height) {            
            if (typeof width === 'undefined' || typeof height === 'undefined') {
                var parent = jQuery('#cesiumContainer');
                width = parent.width();
                height = parent.height();
            }

            if (width !== 0 && height !== 0) {
                _viewer.canvas.width = width;
                _viewer.canvas.height = height;

                _viewer.scene.camera.frustum.aspectRatio = width / height;
            }          
        }
        
        jQuery(window).resize(function(){
            resize();
        });
                 
    return {
        init : function() {
            initView();    
        },
        
        render : function(data) {
            render(data);
        }
    }
}();

jQuery(document).ready(function() {
    'use strict';   

    miaview.init();
});