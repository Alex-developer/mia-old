var miaview = function() {
    'use strict';
 
    var _satLegendWidth = 200;
    var _fixedStageWidth = 2880;
    var _legendHeight = 100;    
    var _zoomFactor = 1;
    var _viewLeftMargin = 5;
    var _topMargin = 5;    
    var _leftMargin = 5;
    var _satHeight = 50;
                
    var _viewStage;
    var _backgroundLayer;
    var _timelineLayer;
    var _toolTipLayer;
    var _toolTip;
    var _legendStage;
    var _legendBackgroundLayer;
    var _legendLayer;
    var _mousePosLayer;
    var _mousePosTimeLayer;
    var _mousePosTime;
    
    var _width;
    var _height;
    var _pixelsPerMin;
    
    var _startDate;
    var _startHour = 0;
        
    jQuery(window).resize(function(){
        resize();
    });     

        function render(satellites) {
            getDimensions();        
            _timelineLayer.removeChildren();
            _legendLayer.removeChildren();

            
            var yPos = _topMargin;
            
            var tooltipPos = 0;
            jQuery.each(satellites, function(index, sat) {
                if (jQuery('#' + sat.catnum).prop('checked')) {  
                    _legendLayer.add(new Kinetic.Text({
                        x : _leftMargin,
                        y : yPos,
                        width: _satLegendWidth,
                        height: 15,
                        text : sat.satname,
                        fontSize : 12,
                        fontFamily : 'Verdana',
                        fill : 'white'
                    }));            

                    if (sat.geostationary === 1) {
                        if (sat.elevation > 0) {
                            _timelineLayer.add(new Kinetic.Rect({
                                fill: 'white',
                                x : _viewLeftMargin,
                                y : yPos,
                                width : _fixedStageWidth-_viewLeftMargin,
                                height : 20
                            }));
                            _timelineLayer.add(new Kinetic.Text({
                                x : _viewLeftMargin + 10,
                                y : yPos + 5,
                                width: 400,
                                height: 15,
                                text : 'Satellite is geostationary always visible',
                                fontSize : 12,
                                fontFamily : 'Verdana',
                                fill : 'black'
                            }));                                         
                        } else {
                            _timelineLayer.add(new Kinetic.Text({
                                x : _viewLeftMargin + 10,
                                y : yPos + 5,
                                width: 400,
                                height: 15,
                                text : 'Satellite is geostationary and never visible',
                                fontSize : 12,
                                fontFamily : 'Verdana',
                                fill : 'red'
                            }));                      
                        }
                    } else {
                    
                        _timelineLayer.add(new Kinetic.Line({
                            points : [ _viewLeftMargin, yPos+10, _fixedStageWidth-_viewLeftMargin, yPos+10 ],
                            stroke : '#777',
                            strokeWidth : 1
                        }));
                             
                    }
                    yPos +=_satHeight; 
                }
            });           
            
            _timelineLayer.draw();
            _legendLayer.draw();            
        }

        function drawBackground() {
            getDimensions();
            
            _legendBackgroundLayer.removeChildren();
            _backgroundLayer.removeChildren();
            
            _backgroundLayer.add(new Kinetic.Rect({
                fillLinearGradientStartPoint: [0, 0],
                fillLinearGradientEndPoint: [0, _height / 2],
                fillLinearGradientColorStops: [0, '#374553', 1, '#001224'], 
                x : 0,
                y : 0,
                width : _width,
                height : _height - _legendHeight
            }));
            
            _legendBackgroundLayer.add(new Kinetic.Rect({
                fill: '#001224', 
                x : 0,
                y : 0,
                width : _satLegendWidth,
                height : _height + 25
            }));
                    
            _backgroundLayer.add(new Kinetic.Rect({
                fill: '#374553',
                x : 0,
                y : _height - _legendHeight,
                width : _width,
                height : _legendHeight
            }));        
            
            var baseDate = new Date();
            _startDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), baseDate.getHours(), 0,0);
            _startHour = _startDate.getHours();
            if (_startHour < 0) {
                _startHour = 0;
            }
            var hour = _startHour;
            var counter = 0;
            var length;
            var xTextPos;
            
            for (var i=0; i <= _fixedStageWidth; i += (_pixelsPerMin * 5)) {
                
                switch (counter) {
                    case 0:
                        length = 20;
                        break;

                    case 3:
                    case 9:                
                        length = 10;
                        break;

                    case 6:              
                        length = 15;
                        break;
                                            
                    default:
                        length = 5;
                        break;
                }
                
                _backgroundLayer.add(new Kinetic.Line({
                    points : [ i + _viewLeftMargin, _height - _legendHeight, i + _viewLeftMargin, _height - _legendHeight + length ],
                    stroke : '#777',
                    strokeWidth : 1
                })); 
                
                if (hour > 24) {
                    hour = 1;
                }
                if (length === 20) {
                    if (i === 0) {
                        xTextPos = _viewLeftMargin;    
                    } else {
                        xTextPos = i + _viewLeftMargin - (hour < 10?3:7);
                    }
                    _backgroundLayer.add(new Kinetic.Text({
                        x : xTextPos,
                        y : _height - 70,
                        text : hour,
                        fontSize : 10,
                        fontFamily : 'Verdana',
                        fill : 'white'
                    }));
                    hour++; 
                }
                counter++;
                if (counter === 12) {
                    counter = 0;
                }
                                          
            }
            _backgroundLayer.draw();
            _legendBackgroundLayer.draw();
        }
            
        function initView() {
            _viewStage = new Kinetic.Stage({
                container : 'timelineview',
                width : window.innerWidth -100,
                height : window.innerHeight - 56
            });
            
            _backgroundLayer = new Kinetic.Layer();
            _viewStage.add(_backgroundLayer);
            
            _timelineLayer = new Kinetic.Layer({
                width: _satLegendWidth
            });
            _viewStage.add(_timelineLayer);  
            
            _toolTipLayer = new Kinetic.Layer();
            _toolTip = new Kinetic.Text({
                text: '',
                fontFamily: 'Calibri',
                fontSize: 10,
                padding: 5,
                fill: 'white',
                alpha: 0.50,
                visible: false
            });
            _toolTipLayer.add(_toolTip);            
            _viewStage.add(_toolTipLayer); 
            
            _legendStage = new Kinetic.Stage({
                container : 'timelinelegend',
                width : 200,
                height : 500
            });            
            _legendBackgroundLayer = new Kinetic.Layer();
            _legendStage.add(_legendBackgroundLayer);
            _legendLayer = new Kinetic.Layer();
            _legendStage.add(_legendLayer);   
            
            _mousePosLayer = new Kinetic.Layer();
            _viewStage.add(_mousePosLayer);                
            _mousePosTimeLayer = new Kinetic.Layer();
            _legendStage.add(_mousePosTimeLayer);                         
            _mousePosTime = new Kinetic.Text({
                x : 5,
                y : 0,
                text : 'N/A',
                fontSize : 10,
                fontFamily : 'Verdana',
                fill : 'white'
            });
            _mousePosTimeLayer.add(_mousePosTime); 
            
            drawBackground();                                               
        }  
        
        function getDimensions() {
            _width = _viewStage.getWidth();
            _height = _viewStage.getHeight();
            
            _pixelsPerMin = _fixedStageWidth / 1440;
            
            _pixelsPerMin = _pixelsPerMin * _zoomFactor;
        }    
        
        function resize(width, height) {
            if (typeof width === 'undefined' || typeof height === 'undefined') {
                var parent = jQuery('#timeline');
                width = parent.width();
                height = parent.height();
            }
            
            var stageWidth = _fixedStageWidth + _viewLeftMargin-20;
            
            if (width !== 0 && height !== 0) {
                
                jQuery('#timelinelegend').width(200);
                jQuery('#timelinelegend').height(height);

                jQuery('#timelineview').width(width - 220);
                jQuery('#timelineview').height(height);
                            
                _viewStage.setSize(stageWidth, height-25);
                _legendStage.setSize(200, height-25);
                
                _mousePosTimeLayer.setX(0);
                _mousePosTimeLayer.setY(height-50);
                
                getDimensions();
                drawBackground();
            }          
        }                  
               
    return {
    
        render : function(data) {
            render(data)
        },
        
        init : function() { 
            initView();   
        }
    }
}();

jQuery(document).ready(function() {
    'use strict';   

    miaview.init();
});