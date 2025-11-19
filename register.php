<?php

$username = $_POST['username'];
$password = $_POST['password'];

$accounts = fopen("account.dat", "a") or die("Error.");

fwrite($accounts, $username . " " . password_hash($password, PASSWORD_DEFAULT) . " \n");

fclose($accounts);