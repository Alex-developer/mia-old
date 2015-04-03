<?php
class timelineview {
    private $app = null;
    private $name = 'Timeline View';
    
    function __construct($app) {
        $this->app = $app;
    }
        
    public function render() {
        $this->app->render('index.html', array(
            'template' => 'timelineview/timelineview.html',
            'ui' => 'modules/timelineview/timelineview.js',
            'name' => $this->name                         
        ));        
    }
}