<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

include 'config.php';

if (!isset($_SESSION['userID'])) {
    error_log('User not authenticated. Session data: ' . print_r($_SESSION, true));
    echo json_encode(['status' => 'error', 'message' => 'User not authenticated']);
    exit();
}

$userID = $_SESSION['userID'];
error_log('User authenticated. UserID: ' . $userID);

$input = json_decode(file_get_contents('php://input'), true);
error_log('Received input: ' . print_r($input, true));

$taskID = $input['id'];
$title = $input['title'];
$description = isset($input['content']) ? $input['content'] : '';  // Obsługa braku pola 'content'

$query = $conn->prepare("UPDATE Tasks SET title = ?, description = ? WHERE ID = ? AND userID = ?");
$query->bind_param("ssii", $title, $description, $taskID, $userID);
$query->execute();

if ($query->affected_rows > 0) {
    error_log('Task updated successfully');
    echo json_encode(['status' => 'success', 'message' => 'Task updated successfully']);
} else {
    error_log('Task update failed. Affected rows: ' . $query->affected_rows);
    // echo json_encode(['status' => 'error', 'message' => 'Task update failed']);
}
?>
