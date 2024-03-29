<?php
include 'functions.php';
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
$parameters = array('parrot' => '', 'width' => '', 'alarmpause' => '');

$continue = false;
foreach (array_keys($parameters) as $parameter) {
    if (isset($_POST[$parameter])) {
        $continue = true;
    }
}
if (!$continue){
    return;
}

foreach (array_keys($parameters) as $parameter) {
    if (!isset($_POST[$parameter])) {
        $data = file_get_contents("currentparrot.json");
        $parameters[$parameter] = json_decode($data, true)[$parameter];
    } else {
        $parameters[$parameter] = trim(strtolower($_POST[$parameter]));
    }
}

if ($parameters["parrot"] == "random") {
    $file = randomFile(true);
} else if ($parameters["parrot"] == "randomnoflags") {
    $file = randomFile(false);
} else {
    $file = searchForFile($parameters["parrot"]);
}

if (file_exists($file)) {
    $type = pathinfo($file, PATHINFO_EXTENSION);
    $filename = pathinfo($file, PATHINFO_FILENAME);
    $data = file_get_contents($file);
    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

    $arr = array('parrot' => $filename, 'width' => $parameters["width"], 'alarmpause' => $parameters["alarmpause"], 'base64' => $base64);
    $json = json_encode($arr);

    if (file_put_contents("currentparrot.json", $json)){
        file_put_contents("changed.txt", time());
        echo "Erfolgreich geändert => ".$filename;
    }
    else
        echo "Ups! Da ist was schiefgelaufen";
}