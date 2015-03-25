<?php
require '../vendor/autoload.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim(array(
    'view' => new \Slim\Views\Twig(),
     'templates.path' => './templates',
));

$view = $app->view();
$view->parserOptions = array(
    'debug' => true,
    'cache' => dirname(__FILE__) . '/cache'
);

$app->get('/', function () use ($app) {
    $app->render('index.html', array(
        'foo' => 'bar'
    ));
});
           

$app->run();  
?>
