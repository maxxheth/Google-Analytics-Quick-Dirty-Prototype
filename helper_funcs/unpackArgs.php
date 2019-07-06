<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

function unpackArgsAssemblyLine($combinedParams) {

  $unpackedParams = array_reduce($combinedParams, function($acc, $curr) {

    $acc[] = unpackArgs($curr);
  
    return $acc;
  
  }, array());

  return $unpackedParams;

}


function unpackArgs($array = array()) {

    $arrayArgs = array_reduce($array, function($acc, $curr) use ($array) {  

        switch(key($array)) {
        
          case 'startDate': $acc[] = $curr;
        
          break;
        
          case 'endDate': $acc[] = $curr;
        
          break;
        
          case 'expression': $acc[] = $curr;
        
          break;
        
          case 'alias': $acc[] = $curr;
        
          break;

          case 'name': $acc[] = $curr;
        
        }
        
        return $acc;
        
    }, array());

    return $arrayArgs;

}

