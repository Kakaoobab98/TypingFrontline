<?php

$username = $_POST['username'];
$points = $_POST['points'];

$pointsFile = fopen("points.dat", "a") or die("Hiba.");

fwrite($pointsFile, $username . " " . $points . " \n");

fclose($pointsFile);