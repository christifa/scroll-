<?php
header('Content-Type: application/json');

// Database configuration
$servername = "mysql.10web.site";
$username = "live_user_4N0k";
$password = "bZ8VovPWxzYjPIM8DPqEASs8WwH8xFgOYN";
$dbname = "live_4N0k";
$table_prefix = 'wp_';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Define the table names
$gigs_table = $table_prefix . "gigs"; // You need to create this custom table
$users_table = $table_prefix . "users"; // WordPress users table

// Handle requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    if ($action == 'register') {
        $username = $_POST['username'];
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

        $sql = "INSERT INTO $users_table (user_login, user_pass) VALUES ('$username', '$password')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error: ' . $sql . '<br>' . $conn->error]);
        }
    } elseif ($action == 'postGig') {
        $title = $_POST['title'];
        $description = $_POST['description'];
        $category = $_POST['category'];
        $price = $_POST['price'];
        $location = $_POST['location'];

        $sql = "INSERT INTO $gigs_table (title, description, category, price, location) VALUES ('$title', '$description', '$category', '$price', '$location')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['status' => 'success', 'message' => 'Gig posted successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error: ' . $sql . '<br>' . $conn->error]);
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM $gigs_table ORDER BY id DESC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $gigs = [];
        while($row = $result->fetch_assoc()) {
            $gigs[] = $row;
        }
        echo json_encode(['status' => 'success', 'gigs' => $gigs]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No gigs found']);
    }
}

$conn->close();
?>
