<?php
require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM categories ORDER BY display_order ASC");
        $categories = $stmt->fetchAll();
        sendJsonResponse(["status" => "success", "data" => $categories]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        $id = $data['id'] ?? ('cat-' . time());
        $slug = $data['slug'] ?? $id;
        $name_en = $data['name_en'] ?? $data['nameEn'] ?? 'New Category';
        $name_ar = $data['name_ar'] ?? $data['nameAr'] ?? 'فئة جديدة';
        $desc_en = $data['desc_en'] ?? $data['descEn'] ?? '';
        $desc_ar = $data['desc_ar'] ?? $data['descAr'] ?? '';
        $icon = $data['icon'] ?? 'Briefcase';
        $image = $data['image'] ?? '';
        $order = intval($data['display_order'] ?? $data['displayOrder'] ?? 1);
        $featured = !empty($data['featured']) ? 1 : 0;
        $status = $data['status'] ?? 'active';

        $stmt = $pdo->prepare("INSERT INTO categories (id, slug, name_en, name_ar, desc_en, desc_ar, icon, image, display_order, featured, status) 
                               VALUES (:id, :slug, :name_en, :name_ar, :desc_en, :desc_ar, :icon, :image, :order, :featured, :status)
                               ON DUPLICATE KEY UPDATE 
                               name_en = VALUES(name_en), name_ar = VALUES(name_ar), desc_en = VALUES(desc_en), desc_ar = VALUES(desc_ar),
                               icon = VALUES(icon), image = VALUES(image), display_order = VALUES(display_order), featured = VALUES(featured), status = VALUES(status)");
        
        $stmt->execute([
            'id' => $id,
            'slug' => $slug,
            'name_en' => $name_en,
            'name_ar' => $name_ar,
            'desc_en' => $desc_en,
            'desc_ar' => $desc_ar,
            'icon' => $icon,
            'image' => $image,
            'order' => $order,
            'featured' => $featured,
            'status' => $status
        ]);

        sendJsonResponse(["status" => "success", "message" => "Category saved successfully", "id" => $id]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            sendJsonResponse(["status" => "error", "message" => "Category ID required"], 400);
        }
        $stmt = $pdo->prepare("DELETE FROM categories WHERE id = :id");
        $stmt->execute(['id' => $id]);
        sendJsonResponse(["status" => "success", "message" => "Category deleted successfully"]);
        break;

    default:
        sendJsonResponse(["status" => "error", "message" => "Method not allowed"], 405);
        break;
}
