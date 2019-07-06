<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

/**
 * 
 * @param array
 * 
 * 1. Check if the params array being passed a) is an array and b) is not empty. Otherwise, return null.
 * 
 * 2. Check to make sure that each array prop is a) a string and that all HTML elements are properly escaped.
 * 
 * 3. Filter out unnecessary characters aggressively because a) we're only expecting very specific types of input and b)
 * this application will mainly be for internal, corporate use, so we can afford to be particularly aggressive
 * as to the types of input we choose to accept.
 * 
 */

function filterNestedArrayParams($params) {

    if (is_array($params) && !empty($params)) {

        $filteredParams = array_reduce($params, function($acc, $curr) {

            $acc[] = filter_var_array($curr, FILTER_SANITIZE_STRING | FILTER_SANITIZE_SPECIAL_CHARS);

            return $acc;

        }, array());

        return $filteredParams;

    } else {

       return null;

    }

}