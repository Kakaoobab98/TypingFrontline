<?php

$username = $_POST['username'];
$points = $_POST['points'];

$pointsArray = file("points.dat", FILE_SKIP_EMPTY_LINES) ?: [];
$brakeInLoop = false;

for ($i = 0; $i < count($pointsArray); $i++)
{
    $temp = explode(" ", $pointsArray[$i]); 
    
    if ($username === $temp[0] && (int)$points <= (int)trim($temp[1]))
    {
        $brakeInLoop = true;
        break;
    }else
    if ((int)$points > (int)trim($temp[1]) && $username === $temp[0] && !$brakeInLoop)
    {
        $pointsArray[$i] = $username. " " . $points . "\n";
        $brakeInLoop = true;
        break;
    }else
    if ($username === $temp[0])
    {
        array_splice($pointsArray, $i, 1);
        break;
    }else
    if ((int)$points > (int)trim($temp[1]))
    {
        array_splice($pointsArray, $i, 0, [$username . " " . $points . "\n"]);
        $i++;
        $brakeInLoop = true;
        continue;
    }
}
if (!$brakeInLoop)
{
    array_push($pointsArray, $username . " " . $points . "\n");
}

file_put_contents("points.dat",$pointsArray);