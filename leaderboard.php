<?php

function ShowLeaderBoard()
{
    global $conn, $sql, $response;


    foreach($conn->query($sql) as $row)
    {
        $response[] = [
            'username' => $row['username'],
            'points' => $row['points'],
            'date' => (new DateTime($row['date']))->format("H:i Y/m/d")
        ];
    }

    echo json_encode($response);
}

#region Setup

$postedDifficulty = $_POST['difficulty']; 

$dns = "mysql:host=mysql.caesar.elte.hu;dbname=tkrissz";

$SQLusername = "tkrissz";

$file = fopen("imp.dat","r");
$SQLpassword = fread($file,filesize("imp.dat"));
fclose($file);

$response = [];

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

$sql = "SELECT username, points, date FROM " . $tn . " ORDER BY points DESC";

#endregion

ShowLeaderBoard();