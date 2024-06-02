<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['userID'])) {
    echo json_encode(array("status" => "authenticated", "userID" => $_SESSION['userID']));
} else {
    echo json_encode(array("status" => "not_authenticated"));
}
?>
