<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

function generateReportArray($createReport, $getResults, $unpackedArgsArray) {

    $reportArray = array_reduce($unpackedArgsArray, function($acc, $curr) use ($createReport, $getResults) {

        $report = call_user_func_array($createReport, $curr);
    
        $acc[] = call_user_func($getResults, $report);
    
        return $acc;
    
    }, array());

    return $reportArray;

}