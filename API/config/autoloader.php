<?php
function autoloader($className) {

    $filename = $className . ".php";

    $filename = str_replace('\\', DIRECTORY_SEPARATOR, $filename);
    if (!is_readable($filename)) {
        throw new Exception("File '$filename' not found");
    }
    require $filename;
}