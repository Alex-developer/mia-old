var miaview = function() {
    'use strict';

    var _margin = 40;
    var _twoPi = 2 * Math.PI;
    var _de2ra = 0.0174532925;
        
    var _stage;
    var _backgroundLayer;
    var _satLayer;
    var _mouseLayer;
    
    var _mousePosTextAz;
    var _mousePosTextEl;
            
    var _height;
    var _width;
    var _cx;
    var _cy;
    var _radius;
    var _halfMargin;
    var _naflag = false;
        
    var _colours = {
        background: '001224',
        border: '38554d',
        grid: 'cccccc',
        text: 'ffffff',
        degcolour: '999999',
        gradientstart: '374553',
        gradientend: '001224'        
    }
    
    var _mousePos = {
        x : 0,
        y : 0,
        el : 0,
        az : 0,
        show : false
    };
            
    function render(data) {
        _satLayer.removeChildren();
        
        var imageObj = new Image();
        imageObj.src = '/assets/images/satellite-24.png';
        
        jQuery.each(data, function( index, satellite ) {
            if (satellite.calculate) {    
                plotOrbits(satellite);
            
                if (satellite.elevation >= 0) {
               
                //var opacity = 0.25;
                var opacity = 1;
                if (satellite.catnum == '39090') {
                    opacity = 1;
                }   
                        
                var pos = convertAzEltoXY(satellite.azimuth, satellite.elevation);
                var sat = new Kinetic.Image({
                    x : pos.x - 12,
                    y : pos.y - 12,
                    image : imageObj,
                    width : 24,
                    height : 24,
                    id : '1',
                    opacity: opacity
                });
               _satLayer.add(sat);
                
                _satLayer.add(new Kinetic.Text({
                    x : pos.x - 8,
                    y : pos.y - 20,
                    text : satellite.satname,
                    fontSize : 10,
                    fontFamily : 'Verdana',
                    fill : 'white',
                    opacity: opacity
                }));                                               
                            
            }                
            }
        });
                
        _satLayer.draw();
        
        updateSatelliteInfo(data);
    }
    
    function updateSatelliteInfo(data) {
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
    
    function plotOrbits(satellite) {
        var prePoints = [];                        
        var points = [];                        
        var postPoints = []; 
        var haveAos = false;
                
        var max = {azimuth:0, elevation:0};
        var maxPrev = {azimuth:0, elevation:0};
        
        var aosPos = {x:0, y:0};
        var aostime = null;
        
        var drawStartArrow = false;
        var drawMaxArrow = false;
        var drawEndArrow = false;
        
        var azimuth = satellite.azimuth;
        var elevation = satellite.elevation;
        
       // var opacity = 0.25;
        var opacity = 1;
        if (satellite.catnum == '39090') {
            opacity = 1;
        }                
        for ( var i = 0; i < satellite.orbit.length; i++) {
            var pos = convertAzEltoXY(satellite.orbit[i].azimuth, satellite.orbit[i].elevation);
            if (satellite.orbit[i].elevation >= 5) {
                if (points.length ===0) {
                    prePoints.push(pos.x | 0);
                    prePoints.push(pos.y | 0);
                    aosPos.x  = pos.x;
                    aosPos.y = pos.y;                                   
                }
                points.push(pos.x | 0);
                points.push(pos.y | 0);

                if (aostime === null) {
                    aostime = satellite.orbit[i].dateTime;
                }
                
                haveAos = true;
                
                if (!drawStartArrow) {
                    drawArrow(prePoints, 'red', opacity);
                    drawStartArrow = true;
                }
            } else {
                if (!haveAos) {
                    if (satellite.orbit[i].elevation >= 0) {
                        prePoints.push(pos.x | 0);
                        prePoints.push(pos.y | 0);                                    
                    }
                } else {
                    if (satellite.orbit[i].elevation >= 0) {
                        if (postPoints.length === 0 && points.length > 0) {
                            postPoints.push(points[points.length-2]);
                            postPoints.push(points[points.length-1]);
                        }
                        postPoints.push(pos.x | 0);
                        postPoints.push(pos.y | 0);
                        
                        if (!drawEndArrow) {
                            if (drawStartArrow) {
                                drawArrow(postPoints, 'green', opacity);
                                drawEndArrow = true; 
                            }                                       
                        }                                   
                    }
                }
            }
            if (satellite.orbit[i].elevation > max.elevation) {
                max = satellite.orbit[i];
                if (i > 0) {
                    maxPrev = satellite.orbit[i - 1];
                }
            }
            
            if (haveAos && satellite.orbit[i].elevation < 0) {
                break;
            }
        }

        if (prePoints.length > 0) {
            _satLayer.add(new Kinetic.Line({
                    points: prePoints,
                    stroke: 'red',
                    strokeWidth: 1,
                    lineCap: 'round',
                    lineJoin: 'round',
                    opacity: opacity
                })
            );
        }
                                                        
        if (points.length > 0) {
             var a = new Kinetic.Line({
                    points: points,
                    stroke: 'green',
                    strokeWidth: 2,
                    lineCap: 'round',
                    lineJoin: 'round',
                    opacity: opacity
                });
            _satLayer.add(a);
            
            /*a.on('mousemove', function() {
                var mousePos = _stage.getMousePosition();
                var x = mousePos.x;
                var y = mousePos.y ;
                console.log('x: ' + x + ', y: ' + y);
            }); */
      
        }
        
        if (postPoints.length > 0) {
            _satLayer.add(new Kinetic.Line({
                    points: postPoints,
                    stroke: 'red',
                    strokeWidth: 1,
                    lineCap: 'round',
                    lineJoin: 'round',
                    opacity: opacity
                })
            );
        }
        
        var maxArray = [];
        pos = convertAzEltoXY(maxPrev.azimuth, maxPrev.elevation); 
        maxArray.push(pos.x | 0);
        maxArray.push(pos.y | 0);                
        pos = convertAzEltoXY(max.azimuth, max.elevation); 
        maxArray.push(pos.x | 0);
        maxArray.push(pos.y | 0);
        drawArrow(maxArray, 'green', opacity);          
        
        /**
        * If satellite is selected but NOT visible then add a text label
        * at the max elevation.
        */
        if (elevation < 5) {
            if (aostime !== null) {
                pos = convertAzEltoXY(max.azimuth, max.elevation);
                _satLayer.add(new Kinetic.Text({
                    x : pos.x + 5,
                    y : pos.y + 5,
                    text : satellite.satname,
                    fontSize : 8,
                    fontFamily : 'Verdana',
                    fill : '#eee',
                    opacity: opacity
                }));  
            }                   
        } 
        if (max.azimuth !== 0 && max.elevation !== 0) {
            pos = convertAzEltoXY(max.azimuth, max.elevation);
            _satLayer.add(new Kinetic.Circle({
                x : pos.x,
                y : pos.y,
                radius : 2,
                stroke : 'red',
                strokeWidth : 1,
                fill: 'red',
                opacity: opacity 
            })); 
        } 
        
        /*
        if (aosPos.x !== 0 && aosPos.y !== 0) {
            _satLayer.add(new Kinetic.Text({
                x : aosPos.x,
                y : aosPos.y,
                text : 'AoS: ' + AGUTIL.shortdatetime(passData.aosTime),
                fontSize : 8,
                fontFamily : 'Verdana',
                fill : '#eee'
            }));                         
        }
        
        if (postPoints.length !== 0) {
            _satLayer.add(new Kinetic.Text({
                x : postPoints[0],
                y : postPoints[1],
                text : 'LoS: ' + AGUTIL.shortdatetime(passData.losTime),
                fontSize : 8,
                fontFamily : 'Verdana',
                fill : '#eee'
            }));                          
        }  
        */                                              
    }
       
    function drawArrow(points, colour, opacity) {
        var fromx = points[points.length-4];
        var fromy = points[points.length-3];

        var tox = points[points.length-2];
        var toy = points[points.length-1];
        
        var headlen = 10;
        var angle = Math.atan2(toy-fromy,tox-fromx);

        var line = new Kinetic.Line({
            points: [fromx, fromy, tox, toy, tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6),tox, toy, tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6)],
            stroke: colour,
            opacity: opacity
        });
        _satLayer.add(line);         
    }
    
    function initView() {
        _stage = new Kinetic.Stage({
            container : 'stage',
            width : window.innerWidth -100,
            height : window.innerHeight - 56
        });

        _backgroundLayer = new Kinetic.Layer();
        _stage.add(_backgroundLayer);    
        
        _satLayer = new Kinetic.Layer();
        _stage.add(_satLayer);  
        
        _mouseLayer = new Kinetic.Layer();
        _stage.add(_mouseLayer);
        
        _stage.on('mousemove', function() {
            _mousePos = _stage.getPointerPosition();
            convertMousePos();
            drawMousePos();
        });

        _stage.on('touchmove', function() {
            _mousePos = _stage.getPointerPosition();
            convertMousePos();
            drawMousePos();
        });
                       
               
                                      
    }   
     
    function drawViewBackground() {
        var _circle;
        var _line;
        var _text;
        var radius;
                    
        setDimensions();
        _backgroundLayer.removeChildren();
        
        var res = _backgroundLayer.add(new Kinetic.Rect({
            x: 0,
            y: 0,
            width: _width,
            height: _height,
            fill: '#' + _colours.background
        }));

        _backgroundLayer.add(new Kinetic.Circle({
            x : _cx,
            y : _cy,
            radius : _radius + _halfMargin,
            stroke : '#' + _colours.border,
            strokeWidth : 10,
            fill: '#' + _colours.background 
        })); 

        _circle = new Kinetic.Circle({
            x : _cx,
            y : _cy,
            radius : _radius,
            fillLinearGradientStartPoint: [0, -10],
            fillLinearGradientEndPoint: [0, 100],
            fillLinearGradientColorStops: [0, '#' + _colours.gradientstart, 1, '#' + _colours.gradientend],
        });
        
        _backgroundLayer.add(_circle);
        
        for (var i=0; i<90; i+=15) {
            radius = (0.5 + (_radius * (i/90))) | 0;
            _backgroundLayer.add(new Kinetic.Circle({
                x : _cx,
                y : _cy,
                radius : radius,
                stroke : '#' + _colours.grid,
                strokeWidth : 1
            }));  
        }        
        
        var elFontSize = 10;
        for (i=15; i<90; i+=15) {
            radius = (0.5 + (_radius * (i/90))) | 0;
            _backgroundLayer.add(new Kinetic.Text({
                x : _cx - radius - 7,
                y : _cy + 5,
                text : (90-i) + '°',
                fontSize : elFontSize,
                fontFamily : 'Verdana',
                fill : '#' + _colours.degcolour
            }));
            _backgroundLayer.add(new Kinetic.Text({
                x : _cx + radius - 7,
                y : _cy + 5,
                text : (90-i) + '°',
                fontSize : elFontSize,
                fontFamily : 'Verdana',
                fill : '#' + _colours.degcolour
            }));                 
        }
        
        var long=0;
        var len;
        for (i=0; i< 360; i+= 5) {
            
            var rad = i * (Math.PI/180);
            
            if (long) {
                len = 10;    
            } else {
                len = 15;
            }
            long = !long;
            
            var startX = (_cx + (_radius + 15 - len) * Math.cos( rad )) | 0;
            var startY =  (_cy + (_radius + 15 - len)  * Math.sin( rad )) | 0;
            
            var endX =  (_cx + (_radius + 15) * Math.cos( rad )) | 0;  
            var endY =  (_cy + (_radius + 15) * Math.sin( rad )) | 0;
            
            _backgroundLayer.add(new Kinetic.Line({
                points : [ startX, startY, endX, endY ],
                stroke : '#' + _colours.grid,
                strokeWidth : 1
            }));           
        } 
        
        _backgroundLayer.add(new Kinetic.Line({
            points : [ _cx - _radius - _halfMargin + 5, _cy,
                    _cx + _radius + _halfMargin - 5, _cy ],
            stroke : '#' + _colours.grid,
            strokeWidth : 1
        }));

        _backgroundLayer.add(new Kinetic.Line({
            points : [ _cx, _cy - _radius - _halfMargin + 5, _cx,
                    _cy + _radius + _halfMargin - 5 ],
            stroke : '#' + _colours.grid,
            strokeWidth : 1
        }));
        
        _backgroundLayer.add(new Kinetic.Text({
            x : _cx + 5,
            y : 30,
            text : 'N',
            fontSize : 15,
            fontFamily : 'Verdana',
            fill : '#' + _colours.text
        }));

        _backgroundLayer.add(new Kinetic.Text({
            x : _cx + _radius ,
            y : _radius + _halfMargin,
            text : 'E',
            fontSize : 15,
            fontFamily : 'Verdana',
            fill : '#' + _colours.text
        }));

        _backgroundLayer.add(new Kinetic.Text({
            x : _cx - _radius - 10,
            y : _radius + _halfMargin,
            text : 'W',
            fontSize : 15,
            fontFamily : 'Verdana',
            fill : '#' + _colours.text
        }));

        _backgroundLayer.add(new Kinetic.Text({
            x : _cx + 8,
            y : _height - _halfMargin - 30,
            text : 'S',
            fontSize : 15,
            fontFamily : 'Verdana',
            fill : '#' + _colours.text
        }));
        
        elFontSize = 14;        
        _backgroundLayer.add(new Kinetic.Text({
            x : 10,
            y : 30,
            text : 'Azimuth:',
            fontSize : elFontSize,
            fontFamily : 'Verdana',
            fill : '#' + _colours.text
        }));
        
        _backgroundLayer.add(new Kinetic.Text({
            x : 10,
            y : 50,
            text : 'Elevation:',
            fontSize : elFontSize,
            fontFamily : 'Verdana',
            fill : '#' + _colours.text
        }));                                        
        _backgroundLayer.draw();   
        
        _mousePosTextAz = new Kinetic.Text({
            x : 80,
            y : 30,
            text : '',
            fontSize : elFontSize,
            fontFamily : 'Calibri',
            fill : '#' + _colours.text
        });
        _mouseLayer.add(_mousePosTextAz);

        _mousePosTextEl = new Kinetic.Text({
            x : 80,
            y : 50,
            text : '',
            fontSize : elFontSize,
            fontFamily : 'Calibri',
            fill : '#' + _colours.text
        });
        _mouseLayer.add(_mousePosTextEl);
                                     
    }
    
    function setDimensions() {

        _height = _stage.getHeight();
        _width = _stage.getWidth();

        var size;

        if (_height > _width) {
            size = _width;
        } else {
            size = _height;
        }
        size = size - (_margin * 2);
        _cx = (0.5 + (_width / 2)) | 0;
        _cy = (0.5 + (_height / 2)) | 0;
        _radius = (0.5 + (size / 2)) | 0;
        _halfMargin = (0.5 + (_margin / 2)) | 0;
    }
    
    function convertAzEltoXY(az, el) {

        if (el < 0) {
            return {
                x : 0,
                y : 0
            };
        }

        /* convert angles to radians */
        az = _de2ra * az;
        el = _de2ra * el;

        /* radius @ el */
        var rel = _radius - (2 * _radius * el) / Math.PI;

        var x = (_cx + rel * Math.sin(az));
        var y = (_cy - rel * Math.cos(az));

        return {
            x : x,
            y : y
        };
    }
    
    /**
    * Resize the view. if no width or heig is specified then it is derived
    * from the parent (_element) element.
    * 
    * @param width Width of view in Pixels
    * @param height Height of view in Pixels
    */
    function resize(width, height) {
        if (typeof width === 'undefined' || typeof height === 'undefined') {
            var parent = jQuery('#stage');
            width = parent.width();
            height = parent.height();
        }

        if (width !== 0 && height !== 0) {
            _stage.setSize(width, height);
            drawViewBackground();
        }          
    }
    
    /**
    * Convert the current postiion of the mouse to Azimuth and
    * Elevation.
    */
    function convertMousePos() {
        var rel = _radius - Math.sqrt((_mousePos.x - _cx) * (_mousePos.x - _cx) + (_mousePos.y - _cy) * (_mousePos.y - _cy));
        _mousePos.el = 90.0 * rel / _radius;
        if (_mousePos.x >= _cx) {
            /* 1. and 2. quadrant */
            _mousePos.az = Math.atan2(_mousePos.x - _cx, _cy - _mousePos.y) / _de2ra;
        } else {
            /* 3 and 4. quadrant */
            _mousePos.az = 360 + Math.atan2(_mousePos.x - _cx, _cy - _mousePos.y) / _de2ra;
        }

        if (_mousePos.az < 0 || _mousePos.el < 0) {
            _mousePos.show = false;
        } else {
            _mousePos.show = true;
        }
    }
    
    function drawMousePos() {
        if (_mousePos.show) {
            _mousePosTextAz.setText(_mousePos.az.toFixed(0));
            _mousePosTextEl.setText(_mousePos.el.toFixed(0));
            _naflag = false;
            _mouseLayer.draw();
        } else {
            if (_naflag === false) {
                _mousePosTextAz.setText('N/A');
                _mousePosTextEl.setText('N/A');
                _naflag = true;
                _mouseLayer.draw();
            }
        }        
    }
            
    jQuery(window).resize(function(){
        resize();
    });     
    
    jQuery('#stage').mousemove(function(e) {
        drawMousePos();
    });
               
    return {
    
        render : function(data) {
            render(data)
        },
        
        init : function() {
            initView();
            resize();
            drawViewBackground();    
        }
    }
}();

jQuery(document).ready(function() {
    'use strict';   

    miaview.init();
});