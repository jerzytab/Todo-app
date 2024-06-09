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

$userID = $_SESSION['userID'];

$input = json_decode(file_get_contents('php://input'), true);
$taskID = $input['id'];

$query = $conn->prepare("DELETE FROM Tasks WHERE ID = ? AND userID = ?");
$query->bind_param("ii", $taskID, $userID);
$query->execute();

if ($query->affected_rows > 0) {
    echo json_encode(['status' => 'success', 'message' => 'Task deleted successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Task deletion failed']);
}
?>
