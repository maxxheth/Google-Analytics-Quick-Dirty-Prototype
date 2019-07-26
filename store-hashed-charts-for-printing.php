<?php 

require(__DIR__ . '/helper_funcs/prettyPrint.php');
require(__DIR__ . '/helper_funcs/pdoSetup.php');
require(__DIR__ . '/helper_funcs/dbCreds.php');

error_reporting(-1);
ini_set('display_errors', 1);

$POST = (array) json_decode(file_get_contents('php://input'), true);

$filtered_post = (array) filter_var_array($POST, FILTER_SANITIZE_SPECIAL_CHARS);

$hashkey = strval(key($filtered_post));

$data = serialize($filtered_post[$hashkey]);

$pdo = connect($host, $port, $dbname, $user, $pass);

$createTable = $pdo->prepare('CREATE TABLE IF NOT EXISTS hashed_charts (

    id INT NOT NULL AUTO_INCREMENT,
    hash LONGTEXT NOT NULL,
    data LONGTEXT NOT NULL,
    PRIMARY KEY (id)

)');

$createTable->execute();

$uploadHashData = $pdo->prepare('INSERT INTO hashed_charts (hash, data) VALUES (:hash, :data)');

$uploadHashData->bindParam(':hash', $hashkey, PDO::PARAM_STR);
$uploadHashData->bindParam(':data', $data, PDO::PARAM_STR);

$uploadHashData->execute();

if (!$uploadHashData) {

    print_r($uploadHashData->errorInfo());

}