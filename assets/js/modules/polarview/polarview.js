var miaview = function() {
    'use strict';

    var _margin = 40;
    var _twoPi = 2 * Math.PI;
    var _de2ra = 0.0174532925;
        
    var _stage;
    var _backgroundLayer;
    
    var _height;
    var _width;
    var _cx;
    var _cy;
    var _radius;
    var _halfMargin;
    
    var _colours = {
        background: '001224',
        border: '38554d',
        grid: 'cccccc',
        text: 'ffffff',
        degcolour: '999999',
        gradientstart: '374553',
        gradientend: '001224'        
    }
        
    function render(data) {
    }
    
    function drawViewBackground() {
        var _circle;
        var _line;
        var _text;
        var radius;
        
        _stage = new Konva.Stage({
            container : 'stage',
            width : window.innerWidth -100,
            height : window.innerHeight - 56
        });

        _backgroundLayer = new Konva.Layer();
        _stage.add(_backgroundLayer);    
        
        setDimensions();
        _backgroundLayer.removeChildren();
        
        var res = _backgroundLayer.add(new Konva.Rect({
            x: 0,
            y: 0,
            width: _width,
            height: _height,
            fill: '#' + _colours.background
        }));

        _backgroundLayer.add(new Konva.Circle({
            x : _cx,
            y : _cy,
            radius : _radius + _halfMargin,
            stroke : '#' + _colours.border,
            strokeWidth : 10,
            fill: '#' + _colours.background 
        })); 

        _circle = new Konva.Circle({
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
            _backgroundLayer.add(new Konva.Circle({
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
            _backgroundLayer.add(new Konva.Text({
                x : _cx - radius - 7,
                y : _cy + 5,
                text : (90-i) + '°',
                fontSize : elFontSize,
                fontFamily : 'Verdana',
                fill : '#' + _colours.degcolour
            }));
            _backgroundLayer.add(new Konva.Text({
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
            
            _backgroundLayer.add(new Konva.Line({
                points : [ startX, startY, endX, endY ],
                stroke : '#' + _colours.grid,
                strokeWidth : 1
            }));           
        } 
        
        _backgroundLayer.add(new Konva.Line({
            points : [ _cx - _radius - _halfMargin + 5, _cy,
                    _cx + _radius + _halfMargin - 5, _cy ],
            stroke : '#' + _colours.grid,
            strokeWidth : 1
        }));

        _backgroundLayer.add(new Konva.Line({
            points : [ _cx, _cy - _radius - _halfMargin + 5, _cx,
                    _cy + _radius + _halfMargin - 5 ],
            stroke : '#' + _colours.grid,
            strokeWidth : 1
        }));
        
        _backgroundLayer.add(new Konva.Text({
            x : _cx + 5,
            y : 30,
            text : 'N',
            fontSize : 15,
            fontFamily : 'Verdana',
            fill : '#' + _colours.text
        }));

        _backgroundLayer.add(new Konva.Text({
            x : _cx + _radius ,
            y : _radius + _halfMargin,
            text : 'E',
            fontSize : 15,
            fontFamily : 'Verdana',
            fill : '#' + _colours.text
        }));

        _backgroundLayer.add(new Konva.Text({
            x : _cx - _radius - 10,
            y : _radius + _halfMargin,
            text : 'W',
            fontSize : 15,
            fontFamily : 'Verdana',
            fill : '#' + _colours.text
        }));

        _backgroundLayer.add(new Konva.Text({
            x : _cx + 8,
            y : _height - _halfMargin - 30,
            text : 'S',
            fontSize : 15,
            fontFamily : 'Verdana',
            fill : '#' + _colours.text
        }));
                                        
        _backgroundLayer.draw();                    
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
            
    return {
    
        render : function(data) {
        },
        
        init : function() {
            drawViewBackground();    
        }
    }
}();

jQuery(document).ready(function() {
    'use strict';   

    miaview.init();
});