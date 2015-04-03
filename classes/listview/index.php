<?php
class listview {
    private $app = null;
    private $name = 'List View';
    
    function __construct($app) {
        $this->app = $app;
    }
        
    public function render() {
        $this->app->render('index.html', array(
            'template' => 'listview/listview.html',
            'ui' => 'modules/listview/listview.js',
            'name' => $this->name                         
        ));        
    }
}