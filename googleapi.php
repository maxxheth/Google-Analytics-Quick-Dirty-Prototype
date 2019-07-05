<?php

// Load the Google API PHP Client Library.
require_once __DIR__ . '/vendor/autoload.php';

$KEY_FILE_LOCATION = __DIR__ . '/tnt-auth.json';
$VIEW_ID = "104508326";
$URL = 'vjs-tnt-app.test';
// Create and configure a new client object.
$client = new Google_Client();
$client->setApplicationName("Hello Analytics Reporting");
$client->setAuthConfig($KEY_FILE_LOCATION);
$client->setAccessType('offline_access');
$client->addScope(Google_Service_Analytics::ANALYTICS_READONLY);

// // If the user has already authorized this app then get an access token
// // else redirect to ask the user to authorize access to Google Analytics.
// if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
//   // Set the access token on the client.
//   $client->setAccessToken($_SESSION['access_token']);

//   // Create an authorized analytics service object.
//   $analytics = new Google_Service_AnalyticsReporting($client);

//   // Call the Analytics Reporting API V4.
//   $response = getReport($analytics);

//   // Print the response.
//   printResults($response);

// } else {
//   $redirect_uri = 'http://' . $URL . '/oauth2callback.php';
//   header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
// }

// Create an authorized analytics service object.
$analytics = new Google_Service_AnalyticsReporting($client);

// Call the Analytics Reporting API V4.
$response = getData($analytics);

// Print the response.
printResults($response);

function getReport($analytics) {

  // Replace with your view ID, for example XXXX.

  global $VIEW_ID;
  

  // Create the DateRange object.
  $dateRange = new Google_Service_AnalyticsReporting_DateRange();
  $dateRange->setStartDate("30daysAgo");
  $dateRange->setEndDate("today");

  // Create the Metrics object.
  $sessions = new Google_Service_AnalyticsReporting_Metric();
  $sessions->setExpression("ga:sessions");
  $sessions->setAlias("sessions");

  // Create the ReportRequest object.
  $request = new Google_Service_AnalyticsReporting_ReportRequest();
  $request->setViewId($VIEW_ID);
  $request->setDateRanges($dateRange);
  $request->setMetrics(array($sessions));

  $body = new Google_Service_AnalyticsReporting_GetReportsRequest();
  $body->setReportRequests( array( $request) );
  return $analytics->reports->batchGet( $body );
}

function getData($analytics) {

  global $VIEW_ID;
  

  // Create the DateRange object.
  $dateRange = new Google_Service_AnalyticsReporting_DateRange();
  $dateRange->setStartDate("30daysAgo");
  $dateRange->setEndDate("today");

  // Create the Metrics object.
  $uniquePageViews = new Google_Service_AnalyticsReporting_Metric();
  $uniquePageViews->setExpression("ga:uniquePageviews");
  $uniquePageViews->setAlias("uniquePageViews");

  // Create the ReportRequest object.
  $request = new Google_Service_AnalyticsReporting_ReportRequest();
  $request->setViewId($VIEW_ID);
  $request->setDateRanges($dateRange);
  $request->setMetrics(array($uniquePageViews));

  $body = new Google_Service_AnalyticsReporting_GetReportsRequest();
  $body->setReportRequests( array( $request) );
  return $analytics->reports->batchGet( $body );

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
          // print_r($dimensionHeaders[$i] . ": " . $dimensions[$i] . "\n");

          $dimensionData = array(

            'dimensions' => array(
              'dimensionHeaders' => $dimensionHeaders[$i],
              'dimensions' => $dimensions[$i]
            )
            
          );

          print_r(json_encode($dimensionData));
          // print_r($dimensionHeaders[$i] . ": " . $dimensions[$i] . "\n");
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
          // print_r($entry->getName() . ": " . $values[$k] . "\n");
        }
      }
    }
  }
}