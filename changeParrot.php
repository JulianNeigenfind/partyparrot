<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With');
$path = dirname(__FILE__) . DIRECTORY_SEPARATOR;
$currentparrotfile = $path . 'currentparrot.gif';

$string = trim(strtolower($_POST["parrot"]));
$file = $path . "parrots" . DIRECTORY_SEPARATOR . "hd". DIRECTORY_SEPARATOR . $string . ".gif";

function i($file)
{
    return file_exists($file);
}

if (!i($file)) $file = $path . "parrots" . DIRECTORY_SEPARATOR . $string . ".gif";
if (!i($file)) $file = $path . "flags"   . DIRECTORY_SEPARATOR . "hd"   . DIRECTORY_SEPARATOR . $string . ".gif";
if (!i($file)) $file = $path . "flags"   . DIRECTORY_SEPARATOR . $string . ".gif";
if (!i($file)) $file = $path . "guests"  . DIRECTORY_SEPARATOR . "hd"   . DIRECTORY_SEPARATOR . $string . ".gif";
if (!i($file)) $file = $path . "guests"  . DIRECTORY_SEPARATOR . $string . ".gif";
if (!i($file)) $file = $path . "parrots" . DIRECTORY_SEPARATOR . "hd"   . DIRECTORY_SEPARATOR . "parrotnotfound.gif";

if (i($file)) {
    copy($file, $currentparrotfile);
    echo $string;
}