<?php
/**
 * Prime Time Typing Services – Image Upload Endpoint
 * Handles file uploads from device and saves to /uploads/ directory
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// Check for uploaded file
$file = $_FILES['file'] ?? $_FILES['image'] ?? null;
if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "No file uploaded or upload error code: " . ($file['error'] ?? 'missing')
    ]);
    exit;
}

// Validate file type
$allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml'
];

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedMimes)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid file type. Only JPEG, PNG, WEBP, GIF, and SVG images are allowed."
    ]);
    exit;
}

// Destination uploads folder (public_html/uploads)
$uploadDir = __DIR__ . '/../../uploads';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Generate clean unique filename
$originalName = pathinfo($file['name'], PATHINFO_FILENAME);
$cleanName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $originalName);
$cleanName = substr($cleanName, 0, 40);

$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
if (!$ext) {
    $mimeExts = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/gif' => 'gif',
        'image/svg+xml' => 'svg'
    ];
    $ext = $mimeExts[$mimeType] ?? 'jpg';
}

$filename = 'ptt_' . date('Ymd_His') . '_' . bin2hex(random_bytes(3)) . '.' . strtolower($ext);
$destination = $uploadDir . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to save uploaded file to disk. Check folder permissions for /uploads"
    ]);
    exit;
}

// Return public URL
$publicUrl = '/uploads/' . $filename;

http_response_code(200);
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    "status" => "success",
    "message" => "Image uploaded successfully",
    "url" => $publicUrl,
    "filename" => $filename,
    "size" => round($file['size'] / 1024, 1) . ' KB'
]);
exit;
