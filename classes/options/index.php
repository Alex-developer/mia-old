<?php
class options {
    private $app = null;
    
    function __construct($app) {
        $this->app = $app;
    }
        
    public function render() {
        $this->app->render('index.html', array(
            'template' => 'options/options.html',
            'ui' => 'modules/options/options.js'                       
        ));        
    }
}