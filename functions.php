<?php
function searchForFile($string)
{
    $path = dirname(__FILE__) . DIRECTORY_SEPARATOR;
    $file = $path . DIRECTORY_SEPARATOR . $string . ".gif";

    if (!file_exists($file)) $file = $path . DIRECTORY_SEPARATOR . $string . ".png";
    if (!file_exists($file)) $file = $path . DIRECTORY_SEPARATOR . $string . ".jpg";
    if (!file_exists($file)) $file = $path . DIRECTORY_SEPARATOR . "additionalmedia" . DIRECTORY_SEPARATOR . $string . ".gif";
    if (!file_exists($file)) $file = $path . DIRECTORY_SEPARATOR . "additionalmedia" . DIRECTORY_SEPARATOR . $string . ".png";
    if (!file_exists($file)) $file = $path . DIRECTORY_SEPARATOR . "additionalmedia" . DIRECTORY_SEPARATOR . $string . ".jpg";
    if (!file_exists($file)) $file = $path . "parrots" . DIRECTORY_SEPARATOR . "hd" . DIRECTORY_SEPARATOR . $string . ".gif";
    if (!file_exists($file)) $file = $path . "parrots" . DIRECTORY_SEPARATOR . $string . ".gif";
    if (!file_exists($file)) $file = $path . "flags" . DIRECTORY_SEPARATOR . "hd" . DIRECTORY_SEPARATOR . $string . ".gif";
    if (!file_exists($file)) $file = $path . "flags" . DIRECTORY_SEPARATOR . $string . ".gif";
    if (!file_exists($file)) $file = $path . "guests" . DIRECTORY_SEPARATOR . "hd" . DIRECTORY_SEPARATOR . $string . ".gif";
    if (!file_exists($file)) $file = $path . "guests" . DIRECTORY_SEPARATOR . $string . ".gif";
    if (!file_exists($file)) $file = $path . "parrots" . DIRECTORY_SEPARATOR . "hd" . DIRECTORY_SEPARATOR . "parrotnotfound.gif";
    return $file;
}

function randomFile()
{
    $files = allFiles();
    return $files[array_rand($files)];
}

function allFiles()
{
    $Directory = new RecursiveDirectoryIterator(dirname(__FILE__) . DIRECTORY_SEPARATOR);
    $Iterator = new RecursiveIteratorIterator($Directory);
    $Regex = new RegexIterator($Iterator, '/^.+\.gif$/i', RecursiveRegexIterator::GET_MATCH);
    $files = array();
    foreach ($Regex as $info) {
        if (!in_array($info[0], $files))
            $files[] = $info[0];
    }
    return $files;
}

function allFileNames()
{
    $filenames = array();

    foreach (allFiles() as $file) {
        $path_parts = pathinfo($file);
        $filename = $path_parts['filename'];
        if (!in_array($filename, $filenames))
            $filenames[] = $filename;
    }
    return $filenames;
}

