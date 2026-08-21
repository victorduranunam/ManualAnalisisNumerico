cat << 'EOF' > /usuarios/profesores/victord/WWW/ManualAnalisisNumerico/public/api/test_db.php
<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json; charset=UTF-8");

$response = [
    "php_version" => PHP_VERSION,
    "db_dir_exists" => file_exists(__DIR__ . '/db'),
    "db_dir_writable" => is_writable(__DIR__ . '/db'),
    "pdo_sqlite_available" => in_array("sqlite", PDO::getAvailableDrivers())
];

try {
    $dbPath = __DIR__ . '/db/test.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, item TEXT)");
    $pdo->exec("INSERT INTO test (item) VALUES ('hola')");
    
    $response["sqlite_status"] = "OK - Archivo SQLite creado y escrito correctamente";
} catch (Exception $e) {
    $response["sqlite_error"] = $e->getMessage();
}

echo json_encode($response, JSON_PRETTY_PRINT);
?>
EOF