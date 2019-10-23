<?php
$path = dirname(__FILE__) . DIRECTORY_SEPARATOR;
$currentparrotfile = $path . 'currentparrot.gif';

$string = strtolower($_POST["parrot"]);
$file = $path . "parrots" . DIRECTORY_SEPARATOR . "hd". DIRECTORY_SEPARATOR . $string . ".gif";

function i($file)
{
    echo $file;
    if(file_exists($file))
        echo " exists ";
    else
        echo " doesntexist ";
    return file_exists($file);
}

if (!i($file)) $file = $path . "parrots" . DIRECTORY_SEPARATOR . $string . ".gif";
if (!i($file)) $file = $path . "flags"   . DIRECTORY_SEPARATOR . "hd"   . DIRECTORY_SEPARATOR . $string . ".gif";
if (!i($file)) $file = $path . "flags"   . DIRECTORY_SEPARATOR . $string . ".gif";
if (!i($file)) $file = $path . "guests"  . DIRECTORY_SEPARATOR . "hd"   . DIRECTORY_SEPARATOR . $string . ".gif";
if (!i($file)) $file = $path . "guests"  . DIRECTORY_SEPARATOR . $string . ".gif";
if (!i($file)) $file = $path . "parrots" . DIRECTORY_SEPARATOR . "hd"   . DIRECTORY_SEPARATOR . "parrotnotfound.gif";

if (i($file)){
    copy($file, $currentparrotfile);
    echo "successful";
}else{
    echo "unsuccessful";
}

echo " ".$file;