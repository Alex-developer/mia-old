<?php
class index {
    private $app = null;
    
    function __construct($app) {
        $this->app = $app;
    }
        
    public function render() {
        $this->app->render('index.html', array(
            'template' => 'home/home.html',
            'ui' => 'modules/home/home.js'
        ));        
    }
}
