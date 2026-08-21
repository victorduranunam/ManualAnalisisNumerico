<?php
// Evitar advertencias previo a la salida JSON
error_reporting(0);
ini_set('display_errors', 0);

// Encabezados CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(["mensaje" => "Método no permitido."]);
    exit();
}

function obtenerSemestreUNAM() {
    date_default_timezone_set('America/Mexico_City');
    $mes = (int)date('n');
    $anio = (int)date('Y');

    if ($mes >= 8 && $mes <= 12) {
        return ($anio + 1) . "-1";
    } else {
        return $anio . "-2";
    }
}

$semestreDetectado = obtenerSemestreUNAM();

// Leer entrada JSON (con soporte de respaldo)
$rawInput = file_get_contents("php://input");
if (empty($rawInput) && isset($GLOBALS['HTTP_RAW_POST_DATA'])) {
    $rawInput = $GLOBALS['HTTP_RAW_POST_DATA'];
}

$data = json_decode($rawInput, true);

// Si los datos vinieron como form-data estándar en lugar de JSON
if (!$data && !empty($_POST)) {
    $data = $_POST;
}

$numeroCuenta   = trim($data['numero_cuenta'] ?? '');
$codigoPython   = trim($data['codigo_python'] ?? '');
$salidaTerminal = trim($data['salida_terminal'] ?? '');

if (empty($numeroCuenta)) {
    http_response_code(400);
    echo json_encode(["mensaje" => "El número de cuenta es obligatorio."]);
    exit();
}

try {
    $dbDir = __DIR__ . '/db';
    if (!file_exists($dbDir)) {
        @mkdir($dbDir, 0777, true);
    }

    $dbPath = $dbDir . '/participaciones.sqlite';

    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_TIMEOUT, 5);

    $queryCreateTable = "CREATE TABLE IF NOT EXISTS participaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        numero_cuenta TEXT NOT NULL,
        codigo_python TEXT,
        salida_terminal TEXT,
        semestre TEXT NOT NULL,
        fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($queryCreateTable);

    date_default_timezone_set('America/Mexico_City');
    $fechaActual = date('Y-m-d H:i:s');

    $stmt = $pdo->prepare("INSERT INTO participaciones (numero_cuenta, codigo_python, salida_terminal, semestre, fecha_registro) 
                          VALUES (:cuenta, :codigo, :salida, :semestre, :fecha)");

    $stmt->execute([
        ':cuenta'   => $numeroCuenta,
        ':codigo'   => $codigoPython,
        ':salida'   => $salidaTerminal,
        ':semestre' => $semestreDetectado,
        ':fecha'    => $fechaActual
    ]);

    http_response_code(200);
    echo json_encode([
        "status"  => "success",
        "mensaje" => "Participación registrada correctamente el $fechaActual (Semestre $semestreDetectado)"
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error de SQLite/PDO: " . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error general: " . $e->getMessage()]);
}
?>
