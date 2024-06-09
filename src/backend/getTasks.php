<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

include 'config.php';

if (!isset($_SESSION['userID'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not authenticated']);
    exit();
}

$userID = $_SESSION['userID'];

$query = $conn->prepare("SELECT ID, title, description, status FROM Tasks WHERE userID = ?");
$query->bind_param("i", $userID);
$query->execute();
$result = $query->get_result();

$tasks = [];
while ($row = $result->fetch_assoc()) {
    $tasks[] = $row;
}

echo json_encode(['status' => 'success', 'tasks' => $tasks]);
?>
