<?php
class threedview {
    private $app = null;
    
    function __construct($app) {
        $this->app = $app;
    }
        
    public function render() {
        $this->app->render('index.html', array(
            'template' => 'threedview/threedview.html',
            'ui' => 'modules/threedview/threedview.js'            
        ));        
    }
}