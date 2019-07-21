<?php

error_reporting(-1);
ini_set('display_errors', 1);

function connect($host, $port, $dbname, $user, $pass) {

    try {

        $pdo = new PDO("mysql:host=$host:$port;dbname=$dbname;charset=utf8mb4", $user, $pass,array(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION));

        $pdo->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, FALSE);

        return $pdo;

    } catch(PDOException $e) {

        echo $e->getMessage();

        die($e);

    }

}