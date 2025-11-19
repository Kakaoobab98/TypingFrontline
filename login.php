<?php

$username = $_POST['username'];
$password = $_POST['password'];

$accounts = fopen("account.dat", "r") or die("Error.");
$usernameMatches = false;


while (!feof($accounts))
{
    $line = fgets($accounts);
    $line = explode(" ", $line);
    
    if ($line[0] === $username)
    {
        $usernameMatches = true;
        if (password_verify($password, $line[1]))
        {
            $response = [
                'success' => true,
                'message' => "Succesfully logged in!"
            ];
        }else
        {
            $response = [
                'success' => false,
                'message' => "Failed to log in!"
            ];
        }
    }
}

if (!$usernameMatches)
{
    $response = [
        'new' => true,
        'message' => "There's no such account.\nClick 'Next' if you want to create a new account.",
    ];
}

header('Content-Type: application/json');

echo json_encode($response);

fclose($accounts);