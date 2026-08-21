<?php
error_reporting(0);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$numeroCuenta = trim($_GET['numero_cuenta'] ?? '');
$fechaFiltro = trim($_GET['fecha'] ?? '');

try {
    $dbPath = __DIR__ . '/db/participaciones.sqlite';

    if (!file_exists($dbPath)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "participaciones" => []]);
        exit();
    }

    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT id, numero_cuenta, codigo_python, salida_terminal, semestre, fecha_registro FROM participaciones WHERE 1=1";
    $params = [];

    if (!empty($numeroCuenta) && $numeroCuenta !== 'TODOS') {
        $sql .= " AND numero_cuenta = :cuenta";
        $params[':cuenta'] = $numeroCuenta;
    }

    if (!empty($fechaFiltro)) {
        $sql .= " AND DATE(fecha_registro) = :fecha";
        $params[':fecha'] = $fechaFiltro;
    }

    $sql .= " ORDER BY id DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $participaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "participaciones" => $participaciones
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "mensaje" => "Error de SQLite: " . $e->getMessage()]);
}
?>
