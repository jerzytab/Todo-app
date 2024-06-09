<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

include 'config.php';

if (!isset($_SESSION['userID'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not authenticated']);
    exit();
}

$taskID = $_POST['ID'];
$status = $_POST['Status'];

$query = $conn->prepare("UPDATE Tasks SET Status = ? WHERE ID = ?");
$query->bind_param("si", $status, $taskID);
$query->execute();

if ($query->affected_rows > 0) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update task status']);
}
?>