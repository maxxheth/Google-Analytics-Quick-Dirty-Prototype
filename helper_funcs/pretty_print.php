<?php 

error_reporting(E_ALL);
ini_set('display_errors', 1);

function prettyPrint($target) {

    echo '<pre>';

    print_r($target);

    echo '</pre>';

}