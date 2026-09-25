<?php
require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

switch ($method) {
    case 'GET':
        $catId = $_GET['category_id'] ?? null;
        if ($catId) {
            $stmt = $pdo->prepare("SELECT * FROM subcategories WHERE category_id = :catId ORDER BY display_order ASC");
            $stmt->execute(['catId' => $catId]);
        } else {
            $stmt = $pdo->query("SELECT * FROM subcategories ORDER BY display_order ASC");
        }
        $subs = $stmt->fetchAll();
        sendJsonResponse(["status" => "success", "data" => $subs]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        $id = $data['id'] ?? ('sub-' . time());
        $catId = $data['category_id'] ?? $data['categoryId'] ?? 'tasheel';
        $slug = $data['slug'] ?? $id;
        $name_en = $data['name_en'] ?? $data['nameEn'] ?? 'New Subcategory';
        $name_ar = $data['name_ar'] ?? $data['nameAr'] ?? 'فئة فرعية جديدة';
        $desc_en = $data['desc_en'] ?? $data['descEn'] ?? '';
        $desc_ar = $data['desc_ar'] ?? $data['descAr'] ?? '';
        $order = intval($data['display_order'] ?? $data['displayOrder'] ?? 1);
        $status = $data['status'] ?? 'active';

        $stmt = $pdo->prepare("INSERT INTO subcategories (id, category_id, slug, name_en, name_ar, desc_en, desc_ar, display_order, status) 
                               VALUES (:id, :catId, :slug, :name_en, :name_ar, :desc_en, :desc_ar, :order, :status)
                               ON DUPLICATE KEY UPDATE 
                               category_id = VALUES(category_id), name_en = VALUES(name_en), name_ar = VALUES(name_ar),
                               desc_en = VALUES(desc_en), desc_ar = VALUES(desc_ar), display_order = VALUES(display_order), status = VALUES(status)");
        
        $stmt->execute([
            'id' => $id,
            'catId' => $catId,
            'slug' => $slug,
            'name_en' => $name_en,
            'name_ar' => $name_ar,
            'desc_en' => $desc_en,
            'desc_ar' => $desc_ar,
            'order' => $order,
            'status' => $status
        ]);

        sendJsonResponse(["status" => "success", "message" => "Subcategory saved successfully", "id" => $id]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            sendJsonResponse(["status" => "error", "message" => "Subcategory ID required"], 400);
        }
        $stmt = $pdo->prepare("DELETE FROM subcategories WHERE id = :id");
        $stmt->execute(['id' => $id]);
        sendJsonResponse(["status" => "success", "message" => "Subcategory deleted successfully"]);
        break;

    default:
        sendJsonResponse(["status" => "error", "message" => "Method not allowed"], 405);
        break;
}
