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
    runRoute('index', $app);
});

$app->get('/listview', function () use ($app) {
    runRoute('listview', $app);
});

$app->get('/polarview', function () use ($app) {
    runRoute('polarview', $app);
});

$app->get('/timelineview', function () use ($app) {
    runRoute('timelineview', $app);
});

$app->get('/threedview', function () use ($app) {
    runRoute('threedview', $app);
});

$app->get('/options', function () use ($app) {
    runRoute('options', $app);
});
           
$app->run();

function runRoute($routeName, $app) {
    require 'classes/' . $routeName . '/index.php';
    $class = new $routeName($app);
    $class->render();    
}