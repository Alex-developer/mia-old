var MIABOOTSTRAP = function() {
    'use strict';

    var _worker;
    
        function initWorkers() {
            if (Modernizr.webworkers) {
                
                _worker = new Worker('/assets/js/engine/worker.js');
                _worker.addEventListener('message', function(e) {
                 // console.log('Worker result: ', e.data);
                 miaview.render(JSON.parse(e.data));
                }, false);

                
                var sats =
                    [[
                        "ISS (ZARYA)",
                        "1 25544U 98067A   15086.17334635  .00015434  00000-0  22972-3 0  9994",
                        "2 25544  51.6460 133.7315 0007136 144.2025 255.6332 15.55307244935270"
                    ]];
                    
                    

                var sats =  [["OSCAR 7 (AO-7)          ","1 07530U 74089B   15085.49439727 -.00000011  00000-0  20217-3 0  9995","2 07530 101.5126  63.4285 0012358 103.5423  10.7417 12.53612923846897"],["UOSAT 2 (UO-11)         ","1 14781U 84021B   15086.15365304  .00001225  00000-0  15993-3 0  9993","2 14781  97.8114 145.2217 0008155 348.3096  11.7927 14.82247134669876"],["LUSAT (LO-19)           ","1 20442U 90005G   15085.79584273  .00000244  00000-0  10549-3 0  9992","2 20442  98.5062  23.0324 0012567  36.9182 323.2864 14.32704584315148"],["ITAMSAT (IO-26)         ","1 22826U 93061D   15086.11593543  .00000251  00000-0  11414-3 0  9992","2 22826  98.6946  36.4208 0008932 173.8349 186.2944 14.30166407121352"],["RADIO ROSTO (RS-15)     ","1 23439U 94085A   15084.63882209 -.00000033  00000-0  28060-3 0  9999","2 23439  64.8154  96.5812 0151423  28.2076 332.6948 11.27562826833732"],["JAS-2 (FO-29)           ","1 24278U 96046B   15085.86029150 -.00000002  00000-0  37122-4 0  9990","2 24278  98.5318  65.8204 0349399 284.3399 191.1371 13.53047887918893"],["TECHSAT 1B (GO-32)      ","1 25397U 98043D   15084.95075457  .00000129  00000-0  75188-4 0  9995","2 25397  98.5109  38.0429 0001182 151.3774 248.8738 14.23527860867959"],["ISS (ZARYA)             ","1 25544U 98067A   15086.17334635  .00015434  00000-0  22972-3 0  9994","2 25544  51.6460 133.7315 0007136 144.2025 255.6332 15.55307244935270"],["PCSAT (NO-44)           ","1 26931U 01043C   15085.84841541  .00000244  00000-0  12572-3 0  9993","2 26931  67.0528  29.4808 0006417 264.1463  95.8906 14.30279252704021"],["SAUDISAT 1C (SO-50)     ","1 27607U 02058C   15085.50586164  .00001534  00000-0  23997-3 0  9997","2 27607  64.5540  91.2313 0077071 304.5861  54.7986 14.74553481659096"],["CUTE-1 (CO-55)          ","1 27844U 03031E   15085.99649459  .00000429  00000-0  21495-3 0  9995","2 27844  98.6976  95.6927 0009878 171.6626 241.4529 14.21745959608762"],["CUBESAT XI-IV (CO-57)   ","1 27848U 03031J   15085.59278229  .00000324  00000-0  16846-3 0  9996","2 27848  98.7073  95.1588 0009605 179.9806 331.2912 14.21400183608617"],["MOZHAYETS 4 (RS-22)     ","1 27939U 03042A   15086.03590772  .00001168  00000-0  22176-3 0  9999","2 27939  97.8332 251.6338 0012250 290.6673  69.3212 14.65888444614157"],["HAMSAT (VO-52)          ","1 28650U 05017B   15085.80257281  .00003545  00000-0  39961-3 0  9994","2 28650  97.5722  82.0342 0022898 306.9917  52.9203 14.87015676535209"],["CUBESAT XI-V (CO-58)    ","1 28895U 05043F   15086.10411306  .00001564  00000-0  31588-3 0  9994","2 28895  97.8229 278.1670 0016850 192.4978 167.5809 14.62606789501597"],["CUTE-1.7+APD II (CO-65) ","1 32785U 08021C   15085.81381477  .00002427  00000-0  27953-3 0  9998","2 32785  97.6594 132.3835 0012865 344.8482 141.4601 14.86551628373991"],["DELFI-C3 (DO-64)        ","1 32789U 08021G   15086.16076382  .00010784  00000-0  90649-3 0  9994","2 32789  97.6811 147.4374 0010251 301.0607 114.5719 14.98422501374793"],["SEEDS II (CO-66)        ","1 32791U 08021J   15085.81430973  .00003661  00000-0  40089-3 0  9997","2 32791  97.6610 134.0894 0013184 337.8836  22.1811 14.88317679374066"],["YUBILEINY (RS-30)       ","1 32953U 08025A   15086.22059566  .00000010  00000-0 -13620-7 0  9993","2 32953  82.5069  25.2107 0017584 259.9669  99.9422 12.43058067310423"],["PRISM (HITOMI)          ","1 33493U 09002B   15086.12554554  .00004626  00000-0  45591-3 0  9999","2 33493  98.2531 279.5537 0015768 237.6750 122.2951 14.92480790334339"],["KKS-1 (KISEKI)          ","1 33499U 09002H   15085.52391819  .00001706  00000-0  26547-3 0  9997","2 33499  98.2232 221.5540 0010533  88.4620 339.2909 14.74301916331430"],["SWISSCUBE               ","1 35932U 09051B   15085.46070453  .00001439  00000-0  34322-3 0  9999","2 35932  98.3976 203.7012 0007079 226.9556 133.1049 14.55215913291930"],["BEESAT                  ","1 35933U 09051C   15085.80699923  .00001254  00000-0  29916-3 0  9995","2 35933  98.3985 204.9298 0005002 239.1032 120.9673 14.55430484292074"],["ITUPSAT 1               ","1 35935U 09051E   15084.32517875  .00001039  00000-0  25389-3 0  9999","2 35935  98.4087 203.6810 0007419 235.1335 124.9164 14.54676926291735"],["XIWANG-1 (HOPE-1)       ","1 36122U 09072B   15086.08104948 -.00000060  00000-0 -43517-4 0  9998","2 36122 100.2040 133.7805 0007170 310.4492  49.6026 13.16325179253654"],["TISAT 1                 ","1 36799U 10035E   15086.18741816  .00004943  00000-0  54467-3 0  9998","2 36799  98.0115 185.6634 0014369 115.4868 306.1622 14.87924167254762"],["JUGNU                   ","1 37839U 11058B   15085.08029280  .00000491  00000-0  12009-3 0  9992","2 37839  19.9622 346.3261 0019113 209.9848 285.4615 14.12438680178454"],["SRMSAT                  ","1 37841U 11058D   15085.19123683  .00000468  00000-0  11289-3 0  9992","2 37841  19.9728  10.6650 0012045 140.5919   8.6407 14.10456050178221"],["M-CUBED & EXP-1 PRIME   ","1 37855U 11061F   15085.14184165  .00007722  00000-0  47360-3 0  9997","2 37855 101.7189 257.3195 0199670 315.6462  42.8896 14.95559955184735"],["HORYU 2                 ","1 38340U 12025D   15085.85015693  .00003070  00000-0  47518-3 0  9992","2 38340  98.3048  53.7184 0012233   5.9629 354.1722 14.73946856153402"],["AAUSAT3                 ","1 39087U 13009B   15086.12008961  .00000692  00000-0  25825-3 0  9999","2 39087  98.6079 284.7906 0012363 186.5860 173.5155 14.35005931108886"],["STRAND-1                ","1 39090U 13009E   15085.10835700  .00000273  00000-0  11188-3 0  9991","2 39090  98.6141 284.2703 0009071 184.8344 175.2755 14.34747035108736"],["BEESAT-3                ","1 39134U 13015E   15085.84453549  .00009552  00000-0  57709-3 0  9993","2 39134  64.8741 320.7057 0033836 262.0382  97.6900 15.10685890106250"],["BEESAT-2                ","1 39136U 13015G   15086.08186415  .00009106  00000-0  57168-3 0  9991","2 39136  64.8749 321.7250 0034249 261.8507  97.8730 15.09310674106268"],["CUBEBUG-1 (CAPITAN BETO)","1 39153U 13018D   15086.16125876  .00002696  00000-0  37168-3 0  9991","2 39153  98.0188 170.7707 0018149 154.8335 205.3765 14.78926544103358"],["ZACUBE-1 (TSHEPISOSAT)  ","1 39417U 13066B   15086.16487565  .00002603  00000-0  34482-3 0  9997","2 39417  97.7383 151.7398 0061683  44.8861 315.7315 14.79401313 72504"],["TRITON-1                ","1 39427U 13066M   15086.13079704  .00002149  00000-0  35863-3 0  9996","2 39427  97.7252 141.6783 0117587  69.4409 291.9366 14.66409385 71842"],["GOMX 1                  ","1 39430U 13066Q   15086.12966100  .00001676  00000-0  31871-3 0  9993","2 39430  97.7185 135.1335 0155591  88.2875 273.6141 14.57812507 71421"],["HUMSAT-D                ","1 39433U 13066T   15086.14994511  .00005380  00000-0  57423-3 0  9992","2 39433  97.7463 158.3372 0033406  35.2780 325.0639 14.88823819 72908"],["EAGLE 2                 ","1 39436U 13066W   15086.13979223  .00034906  00000-0  26173-2 0  9990","2 39436  97.7522 162.0384 0023069  24.3823 335.8487 15.02357231 73158"],["VELOX-PII               ","1 39438U 13066Y   15086.13030377  .00002141  00000-0  30153-3 0  9990","2 39438  97.7355 149.5390 0073406  49.5646 311.1936 14.76459220 72351"],["CUBEBUG-2 (LO-74)       ","1 39440U 13066AA  15086.15322788  .00002528  00000-0  36883-3 0  9990","2 39440  97.7333 147.7547 0083567  53.6692 307.2195 14.74245679 72240"],["FUNCUBE-1 (AO-73)       ","1 39444U 13066AE  15086.15664906  .00003123  00000-0  40801-3 0  9992","2 39444  97.7386 151.9075 0061104  44.3261 316.2820 14.79864219 71287"],["UWE-3                   ","1 39446U 13066AG  15086.15410360  .00002579  00000-0  35947-3 0  9996","2 39446  97.7354 149.6569 0073057  49.1911 311.5605 14.76733288 71143"],["SPROUT                  ","1 39770U 14029E   15086.04060623  .00002013  00000-0  25056-3 0  9990","2 39770  97.8670 184.0112 0011259 108.3774 251.8661 14.83565425 45450"],["DUCHIFAT-1              ","1 40021U 14033M   15086.19073164  .00003394  00000-0  38026-3 0  9990","2 40021  97.9610 346.5366 0015417  92.7571 267.5431 14.87448615 41611"]];

                                
                messageWorker('start', sats);
            } else {
            }            
        }   
        
        function messageWorker(command, data) {
            
            var message = {
                cmd: command,
                data: data
            };
            
            _worker.postMessage(message);
        } 
        
        function getPosition(options) {
            var deferred = $.Deferred();
    
            navigator.geolocation.getCurrentPosition(
                deferred.resolve,
                deferred.reject,
                options);

            return deferred.promise();
        };

    return {
    
        run : function() {
            initWorkers();
            getPosition().then(function(e){
            });
        }
    }
};

jQuery(document).ready(function() {
    'use strict';   

    var bootstrap = new MIABOOTSTRAP();
    bootstrap.run();
});