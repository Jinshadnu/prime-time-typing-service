<?php
require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM enquiries ORDER BY created_at DESC");
        $enquiries = $stmt->fetchAll();
        sendJsonResponse(["status" => "success", "data" => $enquiries]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        $id = $data['id'] ?? ('ENQ-' . rand(1000, 9999));
        $name = $data['name'] ?? 'Anonymous';
        $phone = $data['phone'] ?? '';
        $email = $data['email'] ?? '';
        $catId = $data['category_id'] ?? $data['categoryId'] ?? 'general';
        $serviceId = $data['service_id'] ?? $data['serviceId'] ?? '';
        $serviceName = $data['service_name'] ?? $data['serviceName'] ?? 'General Inquiry';
        $message = $data['message'] ?? '';
        $source = $data['source'] ?? 'Website Contact Form';

        $stmt = $pdo->prepare("INSERT INTO enquiries (id, name, phone, email, category_id, service_id, service_name, message, source, status) 
                               VALUES (:id, :name, :phone, :email, :catId, :serviceId, :serviceName, :message, :source, 'New')");
        
        $stmt->execute([
            'id' => $id,
            'name' => $name,
            'phone' => $phone,
            'email' => $email,
            'catId' => $catId,
            'serviceId' => $serviceId,
            'serviceName' => $serviceName,
            'message' => $message,
            'source' => $source
        ]);

        sendJsonResponse(["status" => "success", "message" => "Enquiry received successfully", "id" => $id]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        $id = $data['id'] ?? null;
        $status = $data['status'] ?? null;
        $notes = $data['notes'] ?? null;

        if (!$id) {
            sendJsonResponse(["status" => "error", "message" => "Enquiry ID required"], 400);
        }

        $stmt = $pdo->prepare("UPDATE enquiries SET status = COALESCE(:status, status), notes = COALESCE(:notes, notes) WHERE id = :id");
        $stmt->execute(['id' => $id, 'status' => $status, 'notes' => $notes]);

        sendJsonResponse(["status" => "success", "message" => "Enquiry updated"]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            sendJsonResponse(["status" => "error", "message" => "Enquiry ID required"], 400);
        }
        $stmt = $pdo->prepare("DELETE FROM enquiries WHERE id = :id");
        $stmt->execute(['id' => $id]);
        sendJsonResponse(["status" => "success", "message" => "Enquiry deleted successfully"]);
        break;

    default:
        sendJsonResponse(["status" => "error", "message" => "Method not allowed"], 405);
        break;
}
