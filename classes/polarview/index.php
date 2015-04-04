<?php
class polarview {
    private $app = null;
    private $name = 'Polar View';
    
    function __construct($app) {
        $this->app = $app;
    }
        
    public function render() {
        $this->app->render('index.html', array(
            'template' => 'polarview/polarview.html',
            'ui' => 'modules/polarview/polarview.js',
            'name' => $this->name,
            'viewoptions' => 'polarview/viewoptions.html'                        
        ));        
    }
}