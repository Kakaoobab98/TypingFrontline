<?php

try {
function SetSQLViaPlayerExisting()
{
    global $conn, $sql, $postedUsername, $postedPoints, $tn;

    $statement = $conn->query($sql);

    if ($statement->rowCount() == 0)
    {
        $sql = "INSERT INTO " . $tn . " (username, points) VALUES ('" . $postedUsername . "', '" . $postedPoints . "')";
    }else 
    {
        if ((int)$statement->fetch()['points'] <= (int)$postedPoints)
        {
            $sql = "UPDATE " . $tn . " SET points='" . $postedPoints . "' WHERE username='" . $postedUsername . "'";
        }else exit();
    }

    $statement = null;

    $conn->exec($sql);
}

#region Setup

$postedUsername = $_POST['username'];
$postedPoints = $_POST['points'];
$postedDifficulty = $_POST['difficulty'];

$dns = "mysql:host=mysql.caesar.elte.hu;dbname=tkrissz";

$SQLusername = "tkrissz";

$file = fopen("imp.dat","r");
$SQLpassword = fread($file,filesize("imp.dat"));
fclose($file);

$response = "";

$conn = new PDO($dns,$SQLusername,$SQLpassword);

$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$tn = "";

switch ($postedDifficulty)
{
    case 0:
        $tn = "Easy";
        break;
    case 1:
        $tn = "Medium";
        break;
    case 2:
        $tn = "Hard";
        break;
    default:
        throw new InvalidArgumentException("BALFASZ");
        break;
}

$sql = "SELECT username, points FROM " . $tn . " WHERE username='" . $postedUsername . "'";

#endregion

SetSQLViaPlayerExisting();
}catch (Exception $e)
{
    var_dump($e->getMessage());
}