<?php

$postedUsername = $_POST['username'];
$postedPassword = $_POST['password'];

$dns = "mysql:host=mysql.caesar.elte.hu;dbname=tkrissz";

$SQLusername = "tkrissz";

$file = fopen("imp.dat","r");
$SQLpassword = fread($file,filesize("imp.dat"));
fclose($file);

$response = "";

$conn = new PDO($dns,$SQLusername,$SQLpassword);

$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = "INSERT INTO Users (username, password, points) VALUE ('" . $postedUsername . "', '" . password_hash($postedPassword, PASSWORD_DEFAULT) . "', '0')";

var_dump("exec előtt");
try {
    $conn->exec($sql);
}catch(Exception $e)
{
    var_dump($e->getMessage());
}