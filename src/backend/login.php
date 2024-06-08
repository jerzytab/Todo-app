<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

include 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input data']);
    exit();
}

$email = $data->email;
$password = $data->password;

$query = $conn->prepare("SELECT ID, Password FROM Users WHERE Email = ?");
$query->bind_param("s", $email);
$query->execute();
$query->store_result();

if ($query->num_rows == 1) {
    $query->bind_result($userID, $hashedPassword);
    $query->fetch();

    if (password_verify($password, $hashedPassword)) {
        $_SESSION['userID'] = $userID;
        $_SESSION['lastActivity'] = time();
        echo json_encode(['status' => 'success', 'userID' => $userID]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid password']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
}

$query->close();
$conn->close();
?>
