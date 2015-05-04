var azelview = function() {
    'use strict';

    var name = 'Az/El View';  
    
    var _render = false;
    var _mousePos = {
        x : 0,
        y : 0,
        show : false,
        az: 'N/A',
        el: 'N/A',
        time: 'N/A'
    };
    var _width;
    var _height;
    var _stage = null;
    var _mousePosAz = null;
    var _mousePosEl = null;
    var _element;
    var _satellite = null;
    var _passToShow = null;
    var _passData = null;
    var _backgroundLayer;
    var _timeLayer;
    var _plotLayer;
    var _mouseLayer;
    var _mousePosText;
    var _margin = 50;
    var _ystep;
    var _xstep;
    var _tpp;
    var _dppEl;
    var _dppAz;
        
    function setDimensions() {
        _height = _stage.getHeight();
        _width = _stage.getWidth();
        
        _ystep = ((_height - (2 * _margin)) / 6);
        _xstep = ((_width - (2 * _margin)) / 6);

        if (_satellite !== null && _passData === null) {
            _passData = _satellite.getNextPass();    
        }
        if (_satellite !== null && _passData !== null) {
            _tpp = (_width - (2 * _margin)) / _passData.duration;
            _dppEl = (_height - (2 * _margin)) / 90;
            _dppAz = (_height - (2 * _margin)) / 360;            
        } else {
            _tpp = 0;
            _dppEl = 0;
            _dppAz = 0;
        }
                
    }
        
    function drawBackground() {
        setDimensions();
        _backgroundLayer.removeChildren();
        _timeLayer.removeChildren();
        _mouseLayer.removeChildren();
        _backgroundLayer.add(new Kinetic.Rect({
            x: 0,
            y: 0,
            width: _width,
            height: _height,
            fill: '#001224'
        }));
        
        _backgroundLayer.add(new Kinetic.Line({
            points : [ _margin, _margin, _margin, _height - _margin],
            stroke : '#ccc',
            strokeWidth : 1
        }));

        _backgroundLayer.add(new Kinetic.Line({
            points : [ _width - _margin, _margin, _width - _margin, _height - _margin],
            stroke : '#ccc',
            strokeWidth : 1
        }));
        
        _backgroundLayer.add(new Kinetic.Line({
            points : [ _margin, _height - _margin, _width - _margin, _height - _margin],
            stroke : '#ccc',
            strokeWidth : 1
        }));
        
        var ypos = _margin;
        var xpos = _margin;
        var startTime = 0;
        var timeStep = 0;
        var date;
        var okToDraw = true;
        
        for (var i=1; i < 7; i++) {
            _backgroundLayer.add(new Kinetic.Line({
                points : [ _margin, ypos, _margin+10, ypos],
                stroke : '#ccc',
                strokeWidth : 1
            }));
            _backgroundLayer.add(new Kinetic.Line({
                points : [ _width - _margin, ypos, _width - _margin - 10, ypos],
                stroke : '#ccc',
                strokeWidth : 1
            }));
                                   
            _backgroundLayer.add(new Kinetic.Text({
                x : _margin - 30,
                y : ypos - 2,
                text : ((7-i)*60) + 'º',
                align: 'right',
                fontSize : 10,
                fontFamily : 'Verdana',
                fill : 'green'
            }));
              
            _backgroundLayer.add(new Kinetic.Text({
                x : _width - _margin + 3,
                y : ypos - 2,
                text : (90 / 6) * (7-i) + 'º',
                align: 'left',
                fontSize : 10,
                fontFamily : 'Verdana',
                fill : 'white'
            }));

            ypos += _ystep;              
        }
        
        if (_satellite !== null) {
            
            if (_passData === null || typeof _passData === 'undefined') {
                _passData = _satellite.getNextPass();
                if (typeof _passData === 'undefined') {
                    okToDraw = false;    
                }                
            }
            
            if (okToDraw) {
                startTime = _passData.aosDayNum;   
                timeStep = _passData.duration / 6;
                date = _satellite.convertDate(startTime);
                var dateLabel = AGUTIL.date(date);             
                for (i=0; i < 7; i++) {
                    if (i !== 0 && i !== 6) {  
                        _timeLayer.add(new Kinetic.Line({
                            points : [ xpos, _height - _margin, xpos, _height - _margin - 10],
                            stroke : '#ccc',
                            strokeWidth : 1
                        }));
                    }
                    if (_passToShow !== 0) {
                        var formattedDate = AGUTIL.shortTime(date);
                        _timeLayer.add(new Kinetic.Text({
                            x : xpos - 17,
                            y : _height - _margin + 7,
                            text : formattedDate,
                            align: 'left',
                            fontSize : 10,
                            fontFamily : 'Verdana',
                            fill : 'white'
                        }));
                        date = Date.DateAdd('s', timeStep , date);
                    }
                                                                      
                    xpos += _xstep;
                }
                
                _timeLayer.add(new Kinetic.Text({
                    x : 0,
                    y : _height - _margin + 25,
                    width: _width,
                    text : dateLabel,
                    align: 'center',
                    fontSize : 10,
                    fontFamily : 'Verdana',
                    fill : 'white'
                }));
            }           
        }
        
        _backgroundLayer.add(new Kinetic.Text({
            x : _margin - 30,
            y : _margin - 30,
            text : 'Az',
            align: 'right',
            fontSize : 10,
            fontFamily : 'Verdana',
            fill : 'white'
        }));        

        _backgroundLayer.add(new Kinetic.Text({
            x : _width - _margin + 3,
            y : _margin - 30,
            text : 'El',
            align: 'right',
            fontSize : 10,
            fontFamily : 'Verdana',
            fill : 'white'
        }));
        
        _mousePosText = new Kinetic.Text({
            x : 0,
            y : 10,
            width: _width,
            text : '',
            align: 'center',
            fontSize : 10,
            fontFamily : 'Verdana',
            fill : 'white'
        }); 
        _mouseLayer.add(_mousePosText);
                                                
        _backgroundLayer.draw();      
        _timeLayer.draw();      
        _mouseLayer.draw();      
    }
                
    return {
    }
}();