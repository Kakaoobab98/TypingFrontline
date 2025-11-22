<?php

try{
function SetSQLViaPlayerExisting()
{
    global $conn, $sql, $postedUsername, $postedPoints;

    $statement = $conn->query($sql);

    if ($statement->rowCount() == 0)
    {
        $sql = "INSERT INTO Users (username, points) VALUES ('" . $postedUsername . "', " . $postedPoints . "')";
    }else 
    {
        if ((int)$statement->fetch()['points'] <= (int)$postedPoints)
        {
            $sql = "UPDATE Users SET points='" . $postedPoints . "' WHERE username='" . $postedUsername . "'";
        }else exit();
    }

    $statement = null;

    $conn->exec($sql);
}

#region Setup

$postedUsername = $_POST['username'];
$postedPoints = $_POST['points'];
$dns = "mysql:host=mysql.caesar.elte.hu;dbname=tkrissz";

$SQLusername = "tkrissz";

$file = fopen("imp.dat","r");
$SQLpassword = fread($file,filesize("imp.dat"));
fclose($file);

$response = "";

$conn = new PDO($dns,$SQLusername,$SQLpassword);

$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = "SELECT username, points FROM Users WHERE username='" . $postedUsername . "'";

#endregion

SetSQLViaPlayerExisting();
}catch(Exception $e)
{
    var_dump($e->getMessage());
}