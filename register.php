<?php

#region Setup

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

$sql = "INSERT INTO Users (username, password) VALUE ('" . $postedUsername . "', '" . password_hash($postedPassword, PASSWORD_DEFAULT) . "')";

#endregion

$conn->exec($sql);