<?php
$host = "fdb1032.awardspace.net";
$db = "4761973_barbing";
$user = "4761973_barbing";
$pass = "Hello123###";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $email = "admin@barbersalon.com";
    $password = "Admin@1234";
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Check if admin exists
    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->execute([$email]);
    if ($check->rowCount() > 0) {
        echo "Admin user already exists. Try logging in with admin@barbersalon.com / Admin@1234";
        exit;
    }

    // Insert Admin
    $stmt = $conn->prepare("
        INSERT INTO users (name, email, phone, password, role) 
        VALUES (?, ?, ?, ?, 'admin')
    ");
    
    $stmt->execute(["Super Admin", $email, "1234567890", $hashed_password]);

    echo "✅ Admin user created successfully! <br><br>";
    echo "Login Email: <strong>admin@barbersalon.com</strong> <br>";
    echo "Password: <strong>Admin@1234</strong> <br><br>";
    echo "You can now login on the website!";
} catch(PDOException $e) {
    echo "Database Error: " . $e->getMessage();
}
?>
