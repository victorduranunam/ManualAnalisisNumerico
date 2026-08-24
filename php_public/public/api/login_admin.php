<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

error_reporting(0);
ini_set('display_errors', 0);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $claveIngresada = trim($input['password'] ?? '');

    if (empty($claveIngresada)) {
        echo json_encode(['status' => 'error', 'mensaje' => 'Debes ingresar una contraseña.']);
        exit();
    }

    $dbPath = __DIR__ . '/db/participaciones.sqlite';
    if (!file_exists($dbPath)) {
        throw new Exception("Base de datos no disponible.");
    }

    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consultar todos los hashes de contraseñas registradas
    $stmt = $pdo->query("SELECT password_hash FROM administradores");
    $admins = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $autenticado = false;

    foreach ($admins as $admin) {
        if (password_verify($claveIngresada, $admin['password_hash'])) {
            $autenticado = true;
            break;
        }
    }

    if ($autenticado) {
        echo json_encode([
            'status' => 'success',
            'mensaje' => 'Acceso concedido',
            'token' => bin2hex(random_bytes(16))
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'mensaje' => 'Contraseña incorrecta.']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'mensaje' => 'Error de autenticación: ' . $e->getMessage()]);
}
?>
