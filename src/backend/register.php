<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input data']);
    exit();
}

$firstName = $data->firstName;
$lastName = $data->lastName;
$email = $data->email;
$password = $data->password;

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
    exit();
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$query = $conn->prepare("INSERT INTO Users (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)");
$query->bind_param("ssss", $firstName, $lastName, $email, $hashedPassword);

if ($query->execute()) {
    echo json_encode(['status' => 'success', 'userID' => $query->insert_id]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to register user', 'error' => $query->error]);
}
?>