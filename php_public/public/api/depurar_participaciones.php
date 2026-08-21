<?php
error_reporting(0);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

$accion = trim($data['accion'] ?? '');
$idRegistro = intval($data['id'] ?? 0);
$numeroCuenta = trim($data['numero_cuenta'] ?? '');

try {
    $dbPath = __DIR__ . '/db/participaciones.sqlite';

    if (!file_exists($dbPath)) {
        http_response_code(404);
        echo json_encode(["status" => "error", "mensaje" => "Base de datos no encontrada."]);
        exit();
    }

    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // OPCIÓN 1: Eliminar un registro específico por su ID
    if ($accion === 'eliminar_id') {
        if ($idRegistro <= 0) {
            http_response_code(400);
            echo json_encode(["status" => "error", "mensaje" => "ID de registro inválido."]);
            exit();
        }

        $stmt = $pdo->prepare("DELETE FROM participaciones WHERE id = :id");
        $stmt->execute([':id' => $idRegistro]);

        http_response_code(200);
        echo json_encode(["status" => "success", "mensaje" => "Registro #$idRegistro eliminado correctamente."]);
        exit();
    }

    // OPCIÓN 2: Depurar duplicados de un alumno (deja solo el registro más reciente)
    if ($accion === 'depurar_duplicados_cuenta') {
        if (empty($numeroCuenta)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "mensaje" => "Número de cuenta no proporcionado."]);
            exit();
        }

        // Subconsulta para conservar el registro con el ID máximo y borrar los más antiguos
        $sql = "DELETE FROM participaciones 
                WHERE numero_cuenta = :cuenta 
                AND id NOT IN (
                    SELECT MAX(id) FROM participaciones WHERE numero_cuenta = :cuenta
                )";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':cuenta' => $numeroCuenta]);

        $eliminados = $stmt->rowCount();

        http_response_code(200);
        echo json_encode([
            "status" => "success", 
            "mensaje" => "Se depuraron $eliminados registros duplicados para la cuenta $numeroCuenta."
        ]);
        exit();
    }

    http_response_code(400);
    echo json_encode(["status" => "error", "mensaje" => "Acción no reconocida."]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "mensaje" => "Error de SQLite: " . $e->getMessage()]);
}
?>
