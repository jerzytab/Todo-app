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

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input data']);
    exit();
}

$title = $data->title;
$description = $data->description;
$userID = $_SESSION['userID'];

$query = $conn->prepare("INSERT INTO Tasks (Title, Description, UserID) VALUES (?, ?, ?)");
$query->bind_param("ssi", $title, $description, $userID);

if ($query->execute()) {
    echo json_encode(['status' => 'success', 'taskID' => $query->insert_id]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to save task']);
}

$query->close();
$conn->close();
?>