<?php

function FoundUser($password){
    global $postedPassword, $response;
    if (password_verify($postedPassword, $password))
    {
        $response = [
            'success' => true,
            'message' => "Successfully logged in!"
        ];
    }else if ($password == null)
    {
        $response = [
            'new' => true,
            'message' => "There's no such account.\nIf you want to create a new one, click 'Next'."
        ];
    }else
    {
        $response = [
            'success' => false,
            'message' => "Failed to log in!"
        ];
    }
    echo json_encode($response);
}

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

$sql = "SELECT password FROM Users WHERE username='" . $postedUsername . "'";

#endregion

FoundUser($conn->query($sql)->fetch()['password']);
