<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, x-xsrf-token');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Max-Age: 10');
$path = dirname(__FILE__) . DIRECTORY_SEPARATOR;
$currentparrotfile = $path . 'currentparrot.gif';
$type = pathinfo($currentparrotfile, PATHINFO_EXTENSION);
$data = file_get_contents($currentparrotfile);
$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
echo $base64;