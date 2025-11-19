<?php

$leaderboardFile = file('points.dat', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$response = array();

header('Content-Type: application/json');

for ($i = 0; $i < count($leaderboardFile); $i++)
{
    $leaderboardFile[$i] = explode(" ", $leaderboardFile[$i]);
    $username = $leaderboardFile[$i][0];
    $points = $leaderboardFile[$i][1];
    $response[] = [
        'username' => $username,
        'points' => $points
    ];
}
if (count($response) === 0)
    $response[] = [
        'no_record' => 'no_record'
    ];

echo json_encode($response);