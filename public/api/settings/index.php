<?php
require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

switch ($method) {
    case 'GET':
        $key = $_GET['key'] ?? null;
        if ($key) {
            $stmt = $pdo->prepare("SELECT setting_value FROM website_settings WHERE setting_key = :k LIMIT 1");
            $stmt->execute(['k' => $key]);
            $res = $stmt->fetch();
            $val = $res ? json_decode($res['setting_value'], true) : null;
            sendJsonResponse(["status" => "success", "data" => $val]);
        } else {
            $stmt = $pdo->query("SELECT setting_key, setting_value FROM website_settings");
            $rows = $stmt->fetchAll();
            $settings = [];
            foreach ($rows as $r) {
                $settings[$r['setting_key']] = json_decode($r['setting_value'], true) ?: $r['setting_value'];
            }
            sendJsonResponse(["status" => "success", "data" => $settings]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        foreach ($data as $k => $v) {
            $valStr = is_array($v) ? json_encode($v, JSON_UNESCAPED_UNICODE) : strval($v);
            $stmt = $pdo->prepare("INSERT INTO website_settings (setting_key, setting_value) VALUES (:k, :v) 
                                   ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)");
            $stmt->execute(['k' => $k, 'v' => $valStr]);
        }
        sendJsonResponse(["status" => "success", "message" => "Settings saved successfully"]);
        break;

    default:
        sendJsonResponse(["status" => "error", "message" => "Method not allowed"], 405);
        break;
}
