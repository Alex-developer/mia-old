var miaview = function() {
    'use strict';

        function render(data) {
             
        }

        function initView() {
            var viewer = new Cesium.Viewer('cesiumContainer', {
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
                skyBox : new Cesium.SkyBox({
                    sources : {
                      positiveX : '/assets/images/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_px.jpg',
                      negativeX : '/assets/images/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mx.jpg',
                      positiveY : '/assets/images/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_py.jpg',
                      negativeY : '/assets/images/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_my.jpg',
                      positiveZ : '/assets/images/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_pz.jpg',
                      negativeZ : '/assets/images/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mz.jpg'
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
            viewer.terrainProvider = terrainProvider;
            viewer.scene.globe.enableLighting = true;    
        }   
             
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