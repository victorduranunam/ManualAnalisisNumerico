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

    // Obtener filtros enviados por GET
    $numeroCuenta = isset($_GET['numero_cuenta']) ? trim($_GET['numero_cuenta']) : '';
    $fechaFiltro = isset($_GET['fecha']) ? trim($_GET['fecha']) : '';

    $sql = "SELECT id, numero_cuenta, codigo_python, salida_terminal, semestre, fecha_registro FROM participaciones WHERE 1=1";
    $params = [];

    // Aplicar filtro por número de cuenta
    if (!empty($numeroCuenta) && $numeroCuenta !== 'TODOS') {
        $sql .= " AND numero_cuenta = :cuenta";
        $params[':cuenta'] = $numeroCuenta;
    }

    // Aplicar filtro por fecha (YYYY-MM-DD)
    if (!empty($fechaFiltro)) {
        $sql .= " AND DATE(fecha_registro) = :fecha";
        $params[':fecha'] = $fechaFiltro;
    }

    $sql .= " ORDER BY id DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $participaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Definir nombre dinámico del archivo
    $partesNombre = [];
    if (!empty($numeroCuenta) && $numeroCuenta !== 'TODOS') {
        $partesNombre[] = "cuenta_" . $numeroCuenta;
    }
    if (!empty($fechaFiltro)) {
        $partesNombre[] = "fecha_" . $fechaFiltro;
    }
    
    $sufijo = !empty($partesNombre) ? implode("_", $partesNombre) : "todas";
    $nombreArchivo = "participaciones_" . $sufijo . "_" . date('Ymd_His') . ".csv";

    // Encabezados HTTP
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $nombreArchivo . '"');
    header('Pragma: no-cache');
    header('Expires: 0');

    $output = fopen('php://output', 'w');

    // BOM de UTF-8 para Excel
    fprintf($output, "\xEF\xBB\xBF");

    // Encabezados del CSV
    fputcsv($output, [
        'ID', 
        'Número de Cuenta', 
        'Semestre', 
        'Fecha de Registro', 
        'Código Python', 
        'Salida en Terminal'
    ]);

    foreach ($participaciones as $row) {
        // Normalizar saltos de línea a formato Unix (\n) para que Excel respete el formato de bloque de código
        $codigoMultilinea = str_replace(["\r\n", "\r"], "\n", trim($row['codigo_python']));
        $salidaMultilinea = str_replace(["\r\n", "\r"], "\n", trim($row['salida_terminal']));

        fputcsv($output, [
            $row['id'],
            '="' . $row['numero_cuenta'] . '"', // Mantiene el formato de texto para números de cuenta
            $row['semestre'],
            $row['fecha_registro'],
            $codigoMultilinea,
            $salidaMultilinea
        ]);
    }

    fclose($output);
    exit();

} catch (Exception $e) {
    http_response_code(500);
    echo "Error al exportar datos: " . $e->getMessage();
}
?>
