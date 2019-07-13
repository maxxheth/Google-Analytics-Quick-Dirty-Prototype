<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

function massArrayMerge($array01, $array02, $array03 = null) {

  if (isset($array03)) {

    foreach($array01 as $subarrayKey => $subarray) {

      $newArray[] = array_merge($subarray, $array02[$subarrayKey], $array03[$subarrayKey]);
  
    }

  } else {

    if (isset($array01) && is_array($array01)) {

      foreach($array01 as $subarrayKey => $subarray) {

        $newArray[] = array_merge($subarray, $array02[$subarrayKey]);
    
      }

      return $newArray;
    
    }

    // } else {
      
    //   print_r($array01);

    // }

  }
  
  
}

