<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

$title = $data['title'];
$description = $data['description'];
$dueDate = $data['dueDate'];
$userID = $data['userID'];

$sql = "INSERT INTO Tasks (Title, Description, DueDate, UserID) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $title, $description, $dueDate, $userID);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "taskID" => $stmt->insert_id]);
} else {
    echo json_encode(["error" => $conn->error]);
}

$stmt->close();
$conn->close();
?>
