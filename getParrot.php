<?php
include 'functions.php';
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
if (!isset($_GET["parrot"])) {
    return;
}
$string = trim(strtolower($_GET["parrot"]));

if($string == "currentparrot"){
    echo file_get_contents("currentparrot.json");
    return;
}

if($string == "all"){
    $parrots = array();
    foreach (allFileNames() as &$filename) {
        $parrot = array("parrot" => $filename, "base64" => getBase64($filename));
        $parrots[] = $parrot;
    }
    echo json_encode($parrots);
    return;
}

function getArray($string)
{
    $base64 = getBase64($string);
    return array('base64' => $base64);
}

function getBase64($string)
{
    $file = searchForFile($string);
    if (file_exists($file)) {
        $type = pathinfo($file, PATHINFO_EXTENSION);
        $data = file_get_contents($file);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
    }
    return $base64;
}

echo json_encode(getArray($string));

