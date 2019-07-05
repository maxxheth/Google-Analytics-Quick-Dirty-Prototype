<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require('helper_funcs/pretty_print.php');

// Grab $POST data for API requests

$POST = file_get_contents('php://input');

print_r($POST);

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

function fetchReportData($dateRange, $metricsObj) {

  global $VIEW_ID, $analytics;

  $request = new Google_Service_AnalyticsReporting_ReportRequest();
  $request->setViewId($VIEW_ID);
  $request->setDateRanges($dateRange);
  $request->setMetrics(array($metricsObj));

  $body = new Google_Service_AnalyticsReporting_GetReportsRequest();
  $body->setReportRequests( array( $request) );
  return $analytics->reports->batchGet( $body );

} 

function createReport($startDate, $endDate, $expr, $alias) {

    $dateRange = setDates($startDate, $endDate);
    $metricsObj = setMetrics($expr, $alias);
    $reportData = fetchReportData($dateRange, $metricsObj);
    return $reportData;

}

function printResults($reports) { 
  
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

          print_r(json_encode($dimensionData));
         
        }

      }

      for ($j = 0; $j < count($metrics); $j++) {
        $values = $metrics[$j]->getValues();
        for ($k = 0; $k < count($values); $k++) {
          $entry = $metricHeaders[$k];

          $value = $values[$k];

          $metricData = array(
            'metricData' => array(
              'metricName' => $entry->getName(),
              'metricValue' => $value
            )
            
          );

          print_r(json_encode($metricData));
         
        }
      }
    }
  }
}