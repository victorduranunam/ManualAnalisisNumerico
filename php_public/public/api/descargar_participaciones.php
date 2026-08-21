<?php
// Reporte de errores controlado
error_reporting(0);
ini_set('display_errors', 0);

// Configuración de zona horaria
date_default_timezone_set('America/Mexico_City');

try {
    $dbPath = __DIR__ . '/db/participaciones.sqlite';

    if (!file_exists($dbPath)) {
        http_response_code(404);
        die("No se encontró la base de datos de participaciones en el servidor.");
    }

    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Permitir filtrado por semestre mediante parámetro GET (Ej: ?semestre=2027-1)
    $semestreFiltro = $_GET['semestre'] ?? null;

    if ($semestreFiltro) {
        $stmt = $pdo->prepare("SELECT id, numero_cuenta, codigo_python, salida_terminal, semestre, fecha_registro FROM participaciones WHERE semestre = :semestre ORDER BY id DESC");
        $stmt->execute([':semestre' => $semestreFiltro]);
    } else {
        $stmt = $pdo->query("SELECT id, numero_cuenta, codigo_python, salida_terminal, semestre, fecha_registro FROM participaciones ORDER BY id DESC");
    }

    $participaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Nombre dinámico del archivo CSV
    $nombreArchivo = "participaciones_UNAM_" . ($semestreFiltro ? "semestre_" . $semestreFiltro . "_" : "") . date('Y-m-d_H-i') . ".csv";

    // Encabezados HTTP para forzar la descarga del archivo CSV
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $nombreArchivo . '"');
    header('Pragma: no-cache');
    header('Expires: 0');

    // Abrir el buffer de salida de PHP
    $output = fopen('php://output', 'w');

    // 1. Escribir el BOM UTF-8 (para que Microsoft Excel abra correctamente eñes y acentos)
    fprintf($output, "\xEF\xBB\xBF");

    // 2. Encabezados de las columnas del CSV
    fputcsv($output, [
        'ID', 
        'Número de Cuenta', 
        'Código Python Enviado', 
        'Salida en Terminal', 
        'Semestre Lectivo', 
        'Fecha de Registro'
    ]);

    // 3. Escribir cada registro de la base de datos
    foreach ($participaciones as $row) {
        fputcsv($output, [
            $row['id'],
            $row['numero_cuenta'],
            $row['codigo_python'],
            $row['salida_terminal'],
            $row['semestre'],
            $row['fecha_registro']
        ]);
    }

    fclose($output);
    exit();

} catch (PDOException $e) {
    http_response_code(500);
    echo "Error al consultar la base de datos: " . $e->getMessage();
} catch (Exception $e) {
    http_response_code(500);
    echo "Error general: " . $e->getMessage();
}
?>
