<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require(__DIR__ . '/helper_funcs/helperFuncsLoader.php');

/**
 * The original code that this 
 * originated from is located here: https://developers.google.com/analytics/devguides/reporting/core/v4/quickstart/service-php
 * 
 * The idea is to split up the core service components into 
 * separate and modular functions that can be combined with
 * helper functions that help process arguments for each service
 * component in a streamlined fashion. 
 * 
 * 
 */

// Grab $POST data for API requests

$POST = file_get_contents('php://input');

$post_data = json_decode($POST, true);

$dateArgs = $post_data['dateArgs'];

$metricArgs = $post_data['metricArgs'];

$dimensionArgs = isset($post_data['dimensionArgs']) ? $post_data['dimensionArgs'] : null;

$filteredDateArgs = filterNestedArrayArgs($dateArgs);

$filteredMetricArgs = filterNestedArrayArgs($metricArgs);

$filteredDimensionArgs = filterNestedArrayArgs($dimensionArgs);

// Load the Google API PHP Client Library, VIEW_ID, and API creds.
require_once __DIR__ . '/vendor/autoload.php';


$KEY_FILE_LOCATION = __DIR__ . '/tnt-auth.json';
$VIEW_ID = "104508326";
// Create and configure a new client object.
$client = new Google_Client();
$client->setApplicationName("Hello Analytics Reporting");
$client->setAuthConfig($KEY_FILE_LOCATION);
$client->setAccessType('offline_access');
$client->addScope(Google_Service_Analytics::ANALYTICS_READONLY);

// Create an authorized analytics service object.
$analytics = new Google_Service_AnalyticsReporting($client);



$combinedArgs = massArrayMerge($filteredDateArgs, $filteredMetricArgs, $filteredDimensionArgs = null);

$unpackedArgsArray = unpackArgsAssemblyLine($combinedArgs);

// print_r($unpackedArgsArray);

// $reportArray = array_reduce($unpackedArgsArray, function($acc, $curr) {

//   $report = call_user_func_array('createReport', $curr);

//   $acc[] = getResults($report);

//   return $acc;

// }, array());

$reportArray = generateReportArray('createReport', 'getResults', $unpackedArgsArray);

print_r(json_decode($reportArray));

// $report01 = call_user_func_array('createReport', $GAPIArgs01);

// printResults($report01);

function setDates($startDate, $endDate) {

  $dateRange = new Google_Service_AnalyticsReporting_DateRange();
  $dateRange->setStartDate($startDate);
  $dateRange->setEndDate($endDate);

  return $dateRange;

}

function setMetrics($expression, $alias) {

  $metricsObj = new Google_Service_AnalyticsReporting_Metric();
  $metricsObj->setExpression($expression);
  $metricsObj->setAlias($alias);

  return $metricsObj;

}

function setDimension($name) {
  
  $dimensionsObj = new Google_Service_AnalyticsReporting_Dimension();
  $dimensionsObj->setName($name);

  return $dimensionsObj;

}

function fetchReportData($dateRange, $metricsObj, $dimensionObj = null) {

  global $VIEW_ID, $analytics;

  $request = new Google_Service_AnalyticsReporting_ReportRequest();
  $request->setViewId($VIEW_ID);
  $request->setDateRanges($dateRange);
  $request->setMetrics(array($metricsObj));
  
  if (isset($dimensionObj)) {
    $request->setDimensions(array($dimensionObj));
  }

  $body = new Google_Service_AnalyticsReporting_GetReportsRequest();
  $body->setReportRequests( array( $request) );
  return $analytics->reports->batchGet( $body );

} 

function createReport($startDate, $endDate, $expr, $alias, $name = null) {

  $dateRange = setDates($startDate, $endDate);
    
  $metricsObj = setMetrics($expr, $alias);

  if (!isset($name)) {

    $reportData = fetchReportData($dateRange, $metricsObj, null);

    return $reportData;

  } else {

    $dimensionObj = setDimension($name);
    
    $reportData = fetchReportData($dateRange, $metricsObj, $dimensionObj);

    return $reportData;

  }   

}

function getResults($reports) { 
  
  for ( $reportIndex = 0; $reportIndex < count( $reports ); $reportIndex++ ) {
    $report = $reports[ $reportIndex ];
    $header = $report->getColumnHeader();
    $dimensionHeaders = $header->getDimensions();
    $metricHeaders = $header->getMetricHeader()->getMetricHeaderEntries();
    $rows = $report->getData()->getRows();

    for ( $rowIndex = 0; $rowIndex < count($rows); $rowIndex++) {
      $row = $rows[ $rowIndex ];
      $dimensions = $row->getDimensions();
      $metrics = $row->getMetrics();

      if (isset($dimensionHeaders) && is_array($dimensionHeaders)) {
        for ($i = 0; $i < count($dimensionHeaders) && $i < count($dimensions); $i++) {

          $dimensionData = array(

            'dimensions' => array(
              'dimensionHeaders' => $dimensionHeaders[$i],
              'dimensions' => $dimensions[$i]
            )
            
          );
         
        }

      }

      for ($j = 0; $j < count($metrics); $j++) {
        $values = $metrics[$j]->getValues();
        for ($k = 0; $k < count($values); $k++) {
          $entry = $metricHeaders[$k];

          $value = $values[$k];

          if (!empty($dimensionData)) {
            $metricData = array(
              $dimensionData,
              'metricData' => array(
                'metricName' => $entry->getName(),
                'metricValue' => $value
              )
              
            );
          } else {

            $metricData = array(
              'metricData' => array(
                'metricName' => $entry->getName(),
                'metricValue' => $value
              )
            );

          }

          return $metricData;
         
        }
      }
    }
  }
}