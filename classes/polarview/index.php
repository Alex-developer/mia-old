<?php
class polarview {
    private $app = null;
    
    function __construct($app) {
        $this->app = $app;
    }
        
    public function render() {
        $this->app->render('index.html', array(
            'template' => 'polarview/polarview.html',
            'ui' => 'modules/polarview/polarview.js'            
        ));        
    }
}