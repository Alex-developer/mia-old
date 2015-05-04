var MIAWORKER = function() {
    'use strict';

    var homeLat = 52.389899799999995;
    var homeLng = 0.260787;
    var running = false;
    
    importScripts('predictlib.js');
    
    function calc() {

        var satInfo;
        var result = [];
        for (var i = 0; i < PLib.sat.length; i++) {
            satInfo = PLib.QuickFind(PLib.sat[i].name);
            result.push(satInfo);
        }
        self.postMessage(JSON.stringify(result));
        
        if (running) {    
            setTimeout(calc, 1000);
        }
    }
    
    function processMessage(e) {
        var message = e.data;
        switch (message.cmd) {
            case 'start': 
                PLib.tleData = message.data;
                PLib.InitializeData();
                PLib.configureGroundStation(homeLat, homeLng);
                running = true;            
                calc();
                break;
            
            case 'selection':
                for (var i = 0; i < PLib.sat.length; i++) {
                    PLib.sat[i].calculate = false;
                    if (message.data.indexOf(PLib.sat[i].catnum) !== -1) {
                        PLib.sat[i].calculate = true;
                    }
                }
                break;
                
            case 'stop':
                running = false;
                break;
            
            default:
        };        
    }
    
    return {
        processMessage : function(e) {
            processMessage(e);    
        }
    }
}();


self.addEventListener('message', MIAWORKER.processMessage, false); 