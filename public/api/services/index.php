<?php
require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

switch ($method) {
    case 'GET':
        $catId = $_GET['category_id'] ?? null;
        $id = $_GET['id'] ?? null;

        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM services WHERE id = :id LIMIT 1");
            $stmt->execute(['id' => $id]);
            $service = $stmt->fetch();
            if ($service) {
                // Fetch requirements
                $docStmt = $pdo->prepare("SELECT doc_name_en, doc_name_ar, is_mandatory FROM service_documents WHERE service_id = :id ORDER BY display_order ASC");
                $docStmt->execute(['id' => $id]);
                $service['requirements'] = $docStmt->fetchAll();

                // Fetch FAQs
                $faqStmt = $pdo->prepare("SELECT question_en, question_ar, answer_en, answer_ar FROM service_faqs WHERE service_id = :id ORDER BY display_order ASC");
                $faqStmt->execute(['id' => $id]);
                $service['faqs'] = $faqStmt->fetchAll();

                sendJsonResponse(["status" => "success", "data" => $service]);
            } else {
                sendJsonResponse(["status" => "error", "message" => "Service not found"], 404);
            }
        } else {
            $sql = "SELECT * FROM services";
            if ($catId) {
                $sql .= " WHERE category_id = " . $pdo->quote($catId);
            }
            $sql .= " ORDER BY display_order ASC";
            $stmt = $pdo->query($sql);
            $services = $stmt->fetchAll();
            sendJsonResponse(["status" => "success", "data" => $services]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        $id = $data['id'] ?? ('service-' . time());
        $catId = $data['category_id'] ?? $data['categoryId'] ?? 'tasheel';
        $subId = $data['subcategory_id'] ?? $data['subcategoryId'] ?? null;
        $slug = $data['slug'] ?? $id;
        $title_en = $data['title_en'] ?? $data['titleEn'] ?? 'New Service';
        $title_ar = $data['title_ar'] ?? $data['titleAr'] ?? 'خدمة جديدة';
        $short_desc_en = $data['short_desc_en'] ?? $data['shortDescEn'] ?? '';
        $short_desc_ar = $data['short_desc_ar'] ?? $data['shortDescAr'] ?? '';
        $desc_en = $data['desc_en'] ?? $data['descEn'] ?? '';
        $desc_ar = $data['desc_ar'] ?? $data['descAr'] ?? '';
        $govt_fee = floatval($data['govt_fee'] ?? $data['govtFee'] ?? 0);
        $typing_fee = floatval($data['typing_fee'] ?? $data['typingFee'] ?? 0);
        $std_cost = floatval($data['estimated_cost_standard'] ?? $data['estimatedCostStandard'] ?? ($govt_fee + $typing_fee));
        $exp_cost = floatval($data['estimated_cost_express'] ?? $data['estimatedCostExpress'] ?? ($std_cost + 100));
        $fee_range_en = $data['govt_fee_range_en'] ?? $data['govtFeeRangeEn'] ?? ("AED " . $std_cost);
        $fee_range_ar = $data['govt_fee_range_ar'] ?? $data['govtFeeRangeAr'] ?? ($std_cost . " درهم");
        $proc_time_en = $data['processing_time_en'] ?? $data['processingTimeEn'] ?? '24-48 Hours';
        $proc_time_ar = $data['processing_time_ar'] ?? $data['processingTimeAr'] ?? '24 - 48 ساعة';
        $featured = !empty($data['featured']) ? 1 : 0;
        $popular = !empty($data['popular']) ? 1 : 0;
        $order = intval($data['display_order'] ?? $data['displayOrder'] ?? 1);
        $status = $data['status'] ?? 'active';

        $stmt = $pdo->prepare("INSERT INTO services (id, category_id, subcategory_id, slug, title_en, title_ar, short_desc_en, short_desc_ar, desc_en, desc_ar, govt_fee, typing_fee, estimated_cost_standard, estimated_cost_express, govt_fee_range_en, govt_fee_range_ar, processing_time_en, processing_time_ar, featured, popular, display_order, status) 
                               VALUES (:id, :catId, :subId, :slug, :title_en, :title_ar, :short_desc_en, :short_desc_ar, :desc_en, :desc_ar, :gFee, :tFee, :stdCost, :expCost, :frEn, :frAr, :ptEn, :ptAr, :feat, :pop, :order, :status)
                               ON DUPLICATE KEY UPDATE 
                               category_id = VALUES(category_id), subcategory_id = VALUES(subcategory_id), title_en = VALUES(title_en), title_ar = VALUES(title_ar),
                               short_desc_en = VALUES(short_desc_en), short_desc_ar = VALUES(short_desc_ar), desc_en = VALUES(desc_en), desc_ar = VALUES(desc_ar),
                               govt_fee = VALUES(govt_fee), typing_fee = VALUES(typing_fee), estimated_cost_standard = VALUES(estimated_cost_standard), estimated_cost_express = VALUES(estimated_cost_express),
                               govt_fee_range_en = VALUES(govt_fee_range_en), govt_fee_range_ar = VALUES(govt_fee_range_ar),
                               processing_time_en = VALUES(processing_time_en), processing_time_ar = VALUES(processing_time_ar), featured = VALUES(featured), popular = VALUES(popular),
                               display_order = VALUES(display_order), status = VALUES(status)");
        
        $stmt->execute([
            'id' => $id,
            'catId' => $catId,
            'subId' => $subId,
            'slug' => $slug,
            'title_en' => $title_en,
            'title_ar' => $title_ar,
            'short_desc_en' => $short_desc_en,
            'short_desc_ar' => $short_desc_ar,
            'desc_en' => $desc_en,
            'desc_ar' => $desc_ar,
            'gFee' => $govt_fee,
            'tFee' => $typing_fee,
            'stdCost' => $std_cost,
            'expCost' => $exp_cost,
            'frEn' => $fee_range_en,
            'frAr' => $fee_range_ar,
            'ptEn' => $proc_time_en,
            'ptAr' => $proc_time_ar,
            'feat' => $featured,
            'pop' => $popular,
            'order' => $order,
            'status' => $status
        ]);

        sendJsonResponse(["status" => "success", "message" => "Service saved successfully", "id" => $id]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            sendJsonResponse(["status" => "error", "message" => "Service ID required"], 400);
        }
        $stmt = $pdo->prepare("DELETE FROM services WHERE id = :id");
        $stmt->execute(['id' => $id]);
        sendJsonResponse(["status" => "success", "message" => "Service deleted successfully"]);
        break;

    default:
        sendJsonResponse(["status" => "error", "message" => "Method not allowed"], 405);
        break;
}
