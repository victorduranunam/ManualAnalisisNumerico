<?php
error_reporting(0);
ini_set('display_errors', 0);

date_default_timezone_set('America/Mexico_City');

try {
    $dbPath = __DIR__ . '/db/participaciones.sqlite';

    if (!file_exists($dbPath)) {
        http_response_code(404);
        die("No se encontró la base de datos de participaciones.");
    }

    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $semestreFiltro = $_GET['semestre'] ?? null;
    $fechaFiltro = $_GET['fecha'] ?? null;

    $sql = "SELECT id, numero_cuenta, codigo_python, salida_terminal, semestre, fecha_registro FROM participaciones WHERE 1=1";
    $params = [];

    if ($semestreFiltro) {
        $sql .= " AND semestre = :semestre";
        $params[':semestre'] = $semestreFiltro;
    }

    if ($fechaFiltro) {
        $sql .= " AND DATE(fecha_registro) = :fecha";
        $params[':fecha'] = $fechaFiltro;
    }

    $sql .= " ORDER BY id DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $participaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $nombreArchivo = "participaciones_UNAM_" . ($fechaFiltro ? "fecha_" . $fechaFiltro . "_" : "") . date('Y-m-d_H-i') . ".csv";

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $nombreArchivo . '"');
    header('Pragma: no-cache');
    header('Expires: 0');

    $output = fopen('php://output', 'w');
    fprintf($output, "\xEF\xBB\xBF");

    fputcsv($output, [
        'ID', 
        'Número de Cuenta', 
        'Código Python Enviado', 
        'Salida en Terminal', 
        'Semestre Lectivo', 
        'Fecha de Registro'
    ]);

    foreach ($participaciones as $row) {
        $codigoLimpio = str_replace(["\r\n", "\r", "\n"], " | ", $row['codigo_python']);
        $salidaLimpia = str_replace(["\r\n", "\r", "\n"], " | ", $row['salida_terminal']);

        fputcsv($output, [
            $row['id'],
            '="' . $row['numero_cuenta'] . '"',
            $codigoLimpio,
            $salidaLimpia,
            $row['semestre'],
            $row['fecha_registro']
        ]);
    }

    fclose($output);
    exit();

} catch (Exception $e) {
    http_response_code(500);
    echo "Error al exportar datos: " . $e->getMessage();
}
?>
