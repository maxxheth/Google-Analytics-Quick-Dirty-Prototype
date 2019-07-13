<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

function massArrayMerge($array01, $array02, $array03 = null) {

  if (is_array($array01)) {

    // if (isset($array03)) {

    if (is_array($array03)) {

      foreach($array01 as $subarrayKey => $subarray) {

        $newArray[] = array_merge($subarray, $array02[$subarrayKey], $array03[$subarrayKey]);
    
      }

    } else {

      if (is_array($array02)) {

        foreach($array01 as $subarrayKey => $subarray) {

          $newArray[] = array_merge($subarray, $array02[$subarrayKey]);
      
        }

        return $newArray;
      
      }

    }

  }
   
}