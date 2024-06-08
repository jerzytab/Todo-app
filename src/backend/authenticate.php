<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if (isset($_SESSION['userID'])) {
    if (time() - $_SESSION['lastActivity'] > 3600) { // 3600 sekund = 1 godzina
        session_unset();
        session_destroy();
        echo json_encode(array("status" => "not_authenticated", "message" => "Session expired"));
    } else {
        $_SESSION['lastActivity'] = time();
        echo json_encode(array("status" => "authenticated", "userID" => $_SESSION['userID']));
    }
} else {
    echo json_encode(array("status" => "not_authenticated"));
}
?>
