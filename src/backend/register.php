// register.php
<?php
session_start();
header('Content-Type: application/json');

include 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo json_encode(['status' => 'error', 'essage' => 'Invalid input data']);
    exit();
}

$firstName = $data->firstName;
$lastName = $data->lastName;
$email = $data->email;
$password = $data->password;

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'essage' => 'Invalid email format']);
    exit();
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$query = $conn->prepare("INSERT INTO Users (FirstName, LastName, Email, Password) VALUES (?,?,?,?)");
$query->bind_param("ssss", $firstName, $lastName, $email, $hashedPassword);

if ($query->execute()) {
    $_SESSION['userID'] = $query->insert_id;
    echo json_encode(['status' => 'uccess', 'userID' => $query->insert_id]);
} else {
    echo json_encode(['status' => 'error', 'essage' => 'Failed to register user', 'error' => $query->error]);
}
?>