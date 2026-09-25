-- ==============================================================================
-- Prime Time Typing Services – Complete Production MySQL Database Schema & Seed Data
-- Target Platform: Hostinger MySQL / MariaDB (phpMyAdmin)
-- Website: https://primetimetypingservice.com
-- Charset: UTF-8 Unicode (utf8mb4) for full Arabic & English support
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+04:00"; -- UAE Standard Time (GST)

-- -------------------------------------------------------------
-- 1. USERS & ROLES TABLE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('Super Admin', 'Admin', 'Content Manager', 'Enquiry Manager') NOT NULL DEFAULT 'Admin',
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `avatar` VARCHAR(255) DEFAULT NULL,
  `last_login` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 2. MAIN CATEGORIES TABLE (26 UAE Govt Departments)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` VARCHAR(100) PRIMARY KEY,
  `slug` VARCHAR(120) NOT NULL UNIQUE,
  `name_en` VARCHAR(200) NOT NULL,
  `name_ar` VARCHAR(200) NOT NULL,
  `desc_en` TEXT DEFAULT NULL,
  `desc_ar` TEXT DEFAULT NULL,
  `icon` VARCHAR(100) DEFAULT 'Briefcase',
  `image` VARCHAR(255) DEFAULT NULL,
  `display_order` INT NOT NULL DEFAULT 1,
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 3. SUBCATEGORIES TABLE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `subcategories`;
CREATE TABLE `subcategories` (
  `id` VARCHAR(100) PRIMARY KEY,
  `category_id` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(120) NOT NULL,
  `name_en` VARCHAR(200) NOT NULL,
  `name_ar` VARCHAR(200) NOT NULL,
  `desc_en` TEXT DEFAULT NULL,
  `desc_ar` TEXT DEFAULT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
  `icon` VARCHAR(100) DEFAULT 'Folder',
  `display_order` INT NOT NULL DEFAULT 1,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 4. MASTER DOCUMENTS BANK TABLE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `documents`;
CREATE TABLE `documents` (
  `id` VARCHAR(100) PRIMARY KEY,
  `name_en` VARCHAR(255) NOT NULL,
  `name_ar` VARCHAR(255) NOT NULL,
  `is_required` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 5. SERVICES TABLE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` VARCHAR(100) PRIMARY KEY,
  `category_id` VARCHAR(100) NOT NULL,
  `subcategory_id` VARCHAR(100) DEFAULT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `title_en` VARCHAR(255) NOT NULL,
  `title_ar` VARCHAR(255) NOT NULL,
  `short_desc_en` TEXT DEFAULT NULL,
  `short_desc_ar` TEXT DEFAULT NULL,
  `desc_en` TEXT DEFAULT NULL,
  `desc_ar` TEXT DEFAULT NULL,
  `detailed_desc_en` LONGTEXT DEFAULT NULL,
  `detailed_desc_ar` LONGTEXT DEFAULT NULL,
  `eligibility_en` TEXT DEFAULT NULL,
  `eligibility_ar` TEXT DEFAULT NULL,
  `procedure_en` TEXT DEFAULT NULL,
  `procedure_ar` TEXT DEFAULT NULL,
  `important_notes_en` TEXT DEFAULT NULL,
  `important_notes_ar` TEXT DEFAULT NULL,
  `icon` VARCHAR(100) DEFAULT 'Briefcase',
  `image` VARCHAR(255) DEFAULT NULL,
  `govt_fee` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `typing_fee` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `estimated_cost_standard` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `estimated_cost_express` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `govt_fee_range_en` VARCHAR(100) DEFAULT 'AED 200 - 450',
  `govt_fee_range_ar` VARCHAR(100) DEFAULT '200 - 450 درهم',
  `processing_time_en` VARCHAR(100) DEFAULT '24-48 Hours',
  `processing_time_ar` VARCHAR(100) DEFAULT '24 - 48 ساعة',
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `popular` TINYINT(1) NOT NULL DEFAULT 0,
  `display_order` INT NOT NULL DEFAULT 1,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 6. SERVICE REQUIRED DOCUMENTS (MANY-TO-MANY RELATION)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `service_documents`;
CREATE TABLE `service_documents` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `service_id` VARCHAR(100) NOT NULL,
  `doc_name_en` VARCHAR(255) NOT NULL,
  `doc_name_ar` VARCHAR(255) NOT NULL,
  `is_mandatory` TINYINT(1) NOT NULL DEFAULT 1,
  `display_order` INT NOT NULL DEFAULT 1,
  FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 7. SERVICE SPECIFIC FAQS TABLE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `service_faqs`;
CREATE TABLE `service_faqs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `service_id` VARCHAR(100) NOT NULL,
  `question_en` VARCHAR(255) NOT NULL,
  `question_ar` VARCHAR(255) NOT NULL,
  `answer_en` TEXT NOT NULL,
  `answer_ar` TEXT NOT NULL,
  `display_order` INT NOT NULL DEFAULT 1,
  FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 8. GLOBAL FAQS TABLE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `faqs`;
CREATE TABLE `faqs` (
  `id` VARCHAR(100) PRIMARY KEY,
  `category` VARCHAR(100) NOT NULL DEFAULT 'General',
  `question_en` VARCHAR(255) NOT NULL,
  `question_ar` VARCHAR(255) NOT NULL,
  `answer_en` TEXT NOT NULL,
  `answer_ar` TEXT NOT NULL,
  `display_order` INT NOT NULL DEFAULT 1,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 9. HERO SLIDERS & PROMOTIONAL BANNERS TABLE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `banners`;
CREATE TABLE `banners` (
  `id` VARCHAR(100) PRIMARY KEY,
  `badge_en` VARCHAR(150) DEFAULT NULL,
  `badge_ar` VARCHAR(150) DEFAULT NULL,
  `title_en` VARCHAR(255) NOT NULL,
  `title_ar` VARCHAR(255) NOT NULL,
  `desc_en` TEXT DEFAULT NULL,
  `desc_ar` TEXT DEFAULT NULL,
  `image` VARCHAR(255) NOT NULL,
  `cta_text_en` VARCHAR(100) DEFAULT 'Explore Services',
  `cta_text_ar` VARCHAR(100) DEFAULT 'استكشف الخدمات',
  `cta_url` VARCHAR(255) DEFAULT '#services',
  `display_order` INT NOT NULL DEFAULT 1,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `start_date` DATE DEFAULT NULL,
  `end_date` DATE DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 10. TESTIMONIALS TABLE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE `testimonials` (
  `id` VARCHAR(100) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `role` VARCHAR(150) DEFAULT 'Client',
  `service` VARCHAR(150) DEFAULT 'General Typing',
  `rating` INT NOT NULL DEFAULT 5,
  `image` VARCHAR(255) DEFAULT NULL,
  `review_en` TEXT NOT NULL,
  `review_ar` TEXT DEFAULT NULL,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `display_order` INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 11. BLOG & NEWS ARTICLES TABLE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs` (
  `id` VARCHAR(100) PRIMARY KEY,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `title_en` VARCHAR(255) NOT NULL,
  `title_ar` VARCHAR(255) NOT NULL,
  `excerpt_en` TEXT DEFAULT NULL,
  `excerpt_ar` TEXT DEFAULT NULL,
  `content_en` LONGTEXT DEFAULT NULL,
  `content_ar` LONGTEXT DEFAULT NULL,
  `category` VARCHAR(100) DEFAULT 'General',
  `author` VARCHAR(100) DEFAULT 'Prime Time Editorial',
  `image` VARCHAR(255) DEFAULT NULL,
  `published_date` DATE DEFAULT NULL,
  `status` ENUM('published', 'draft') NOT NULL DEFAULT 'published',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 12. CUSTOMERS & CLIENTS TABLE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` VARCHAR(100) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) DEFAULT NULL,
  `total_enquiries` INT NOT NULL DEFAULT 1,
  `last_enquiry_date` DATE DEFAULT NULL,
  `services_requested` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 13. ENQUIRIES & LEADS CRM TABLE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `enquiries`;
CREATE TABLE `enquiries` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) DEFAULT NULL,
  `category_id` VARCHAR(100) DEFAULT NULL,
  `service_id` VARCHAR(100) DEFAULT NULL,
  `service_name` VARCHAR(200) NOT NULL,
  `message` TEXT DEFAULT NULL,
  `status` ENUM('New', 'Contacted', 'In Progress', 'Completed', 'Cancelled') NOT NULL DEFAULT 'New',
  `source` VARCHAR(100) DEFAULT 'Website Contact Form',
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 14. MEDIA ASSETS TABLE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `media`;
CREATE TABLE `media` (
  `id` VARCHAR(100) PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `file_type` VARCHAR(50) DEFAULT 'image/jpeg',
  `file_size` VARCHAR(50) DEFAULT '300 KB',
  `category` VARCHAR(100) DEFAULT 'General',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 15. SETTINGS & SEO CONFIGURATION TABLE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `website_settings`;
CREATE TABLE `website_settings` (
  `setting_key` VARCHAR(100) PRIMARY KEY,
  `setting_value` LONGTEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 16. ACTIVITY LOGS AUDIT TRAIL TABLE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `activity_logs`;
CREATE TABLE `activity_logs` (
  `id` VARCHAR(100) PRIMARY KEY,
  `admin_name` VARCHAR(150) NOT NULL,
  `action` VARCHAR(200) NOT NULL,
  `module` VARCHAR(100) NOT NULL,
  `record_info` VARCHAR(255) DEFAULT NULL,
  `ip_address` VARCHAR(50) DEFAULT '127.0.0.1',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- SEED DATA: DEFAULT ADMINISTRATOR USER
-- Password hash for '1234' and 'admin123'
-- -------------------------------------------------------------
INSERT INTO `users` (`id`, `name`, `email`, `username`, `password_hash`, `role`, `status`) VALUES
(1, 'Super Administrator', 'admin@primetimetyping.com', 'admin', '$2y$10$8g4kU54F0WqC2w0k8Hw0ueW.j4XGv4mF5fWqC2w0k8Hw0ueW.j4XG', 'Super Admin', 'active'),
(2, 'Operations Manager', 'operations@primetimetyping.com', 'zayed_ops', '$2y$10$8g4kU54F0WqC2w0k8Hw0ueW.j4XGv4mF5fWqC2w0k8Hw0ueW.j4XG', 'Admin', 'active');

-- -------------------------------------------------------------
-- SEED DATA: MASTER REQUIRED DOCUMENTS BANK
-- -------------------------------------------------------------
INSERT INTO `documents` (`id`, `name_en`, `name_ar`, `is_required`) VALUES
('doc-passport', 'Passport Copy (Valid 6+ Months)', 'صورة جواز السفر (ساري لمدة 6 أشهر على الأقل)', 1),
('doc-eid', 'Emirates ID Copy / Original', 'صورة / أصل بطاقة الهوية الإماراتية', 1),
('doc-photo', 'Personal Photograph (White Background)', 'صورة شخصية حديثة بخلفية بيضاء', 1),
('doc-license', 'Valid Trade License Copy', 'نسخة سارية من الرخصة التجارية', 0),
('doc-est-card', 'Establishment Immigration & Labour Card', 'بطاقة المنشأة (الهجرة والعمل)', 0),
('doc-labour-contract', 'Electronic Labour Contract Copy', 'نسخة عقد العمل الإلكتروني', 0),
('doc-degree', 'MOFA Attested Educational Certificate', 'مؤهل دراسي مصدق من وزارة الخارجية', 0),
('doc-salary-cert', 'Salary Certificate / WPS Statement', 'شهادة راتب / كشف حساب حماية الأجور (WPS)', 0),
('doc-tenancy', 'Registered Tenancy Contract (Tawtheeq / Ejari)', 'عقد إيجار موثق (توثيق / إيجاري)', 0),
('doc-marriage-cert', 'Attested Marriage Certificate', 'عقد زواج مصدق رسمياً', 0),
('doc-birth-cert', 'Attested Birth Certificate', 'شهادة ميلاد مصدقة رسمياً', 0),
('doc-bank-statement', 'Last 3-6 Months Bank Statement', 'كشف حساب بنكي لآخر 3-6 أشهر', 0),
('doc-medical', 'Medical Fitness Certificate', 'شهادة اللياقة الطبية المعتمدة', 0),
('doc-insurance', 'Valid Health Insurance Policy / Card', 'وثيقة / بطاقة التأمين الصحي السارية', 0),
('doc-mulkiya', 'Vehicle Registration Card (Mulkiya)', 'ملكية المركبة السارية', 0),
('doc-police-clearance', 'Police Good Conduct Certificate', 'شهادة بحث الحالة الجنائية (حسن سيرة وسلوك)', 0);

-- -------------------------------------------------------------
-- SEED DATA: ALL 26 OFFICIAL GOVERNMENT CATEGORIES
-- -------------------------------------------------------------
INSERT INTO `categories` (`id`, `slug`, `name_en`, `name_ar`, `desc_en`, `desc_ar`, `icon`, `display_order`, `featured`, `status`) VALUES
('tasheel', 'tasheel-services', 'Tasheel Services', 'خدمات تسهيل', 'MOHRE typing and processing for employment visas, labor cards, contract modifications and quotas.', 'طباعة وتخليص معاملات وزارة الموارد البشرية والتوطين وتصاريح العمل والكوتا.', 'Briefcase', 1, 1, 'active'),
('tawjeeh', 'tawjeeh-services', 'Tawjeeh Services', 'خدمات توجيه', 'Mandatory labor awareness and training programs, certificate issuance, and worker contracts.', 'برامج التوعية والتدريب الإلزامية للعمال وإصدار شهادة توجيه المعتمدة.', 'Award', 2, 1, 'active'),
('tadbeer', 'tadbeer-services', 'Tad-beer Services (Housemaid)', 'خدمات تدبير (العمالة المساعدة)', 'Sponsorship, entry permits, visa renewals and contract typing for domestic workers and maids.', 'خدمات كفالة واستقدام العمالة المساعدة وعمال الخدمة المنزلية وتجديد الإقامة.', 'Users', 3, 1, 'active'),
('tamm', 'tamm-services', 'Tamm Services', 'خدمات تم (TAMM)', 'Unified Abu Dhabi government platform: driving, municipality, Tawtheeq tenancy & clearances.', 'منصة خدمات حكومة أبوظبي المتكاملة، معاملات البلدية وتوثيق عقود الإيجار.', 'Home', 4, 1, 'active'),
('all-govt', 'all-govt-applications', 'All Kinds of Govt. Applications', 'كافة أنواع الطلبات الحكومية', 'General typing, urgent exemptions, special petitions, and electronic submissions across UAE portals.', 'طباعة وتقديم كافة المعاملات الحكومية الشاملة وطلبات الاسترحام والاستثناء.', 'FileCheck2', 5, 0, 'active'),
('family-visa', 'family-visa-process', 'Family Visa Process', 'معاملات تأشيرة العائلة', 'Residency sponsorship for spouse, children, newborn babies and parents with VIP fast-tracking.', 'معاملات كفالة الإقامة للزوجة والأبناء والوالدين وإصدار إقامة المواليد الجدد.', 'Users', 6, 1, 'active'),
('visit-visa', 'visit-visas', 'Visit Visas', 'تأشيرات الزيارة', '30 & 60 days tourist visas, multiple entry permits, family visit visas and status adjustments.', 'تأشيرات السياحة والزيارة 30 و60 يوماً وتأشيرات الدخول المتعدد وتمديد الزيارة.', 'Plane', 7, 1, 'active'),
('civil-defence', 'civil-defence-services', 'Civil Defence', 'الدفاع المدني', 'Fire safety certificates, engineering drawing approvals, site inspections and commercial clearances.', 'موافقات المخططات الهندسية وشهادات استيفاء السلامة والتفتيش للرخص التجارية.', 'ShieldCheck', 8, 0, 'active'),
('icp-gdrfa', 'immigration-icp-gdrfa', 'Immigration (ICP-GDRFA)', 'إدارة الهجرة (ICP-GDRFA)', 'Entry permits, status modification inside UAE, residency visa stamping and cancellation.', 'أذونات الدخول، تعديل الوضع داخل الدولة، تثبيت الإقامة وإلغاؤها وحل الغرامات.', 'Globe', 9, 1, 'active'),
('ministry-labor', 'ministry-of-labor', 'Ministry of Labor', 'وزارة العمل', 'Establishment cards, company quota applications, labor disputes, and Wage Protection System (WPS).', 'بطاقات المنشأة، كوتا العمالة، النزاعات العمالية، ونظام حماية الأجور (WPS).', 'Briefcase', 10, 0, 'active'),
('adjd', 'judicial-adjd-services', 'Judicial Dept (ADJD) Services', 'خدمات دائرة القضاء (ADJD)', 'Power of Attorney (POA) notarization, legal warnings, court registrations, and rental disputes.', 'توثيق الوكالات القانونية، الإنذارات العدلية، قيد الدعاوى ولجان المنازعات الإيجارية.', 'Building2', 11, 0, 'active'),
('cnia-pass', 'cnia-security-pass', 'CNIA Pass Typing (Security Pass)', 'طباعة تصاريح (CNIA)', 'Critical National Infrastructure & Coastal Authority (CICPA) security passes for ports and fields.', 'تصاريح جهاز حماية المنشآت الحيوية والسواحل للموانئ وحقول النفط والغاز.', 'ShieldCheck', 12, 0, 'active'),
('passport-family-book', 'passport-family-book', 'UAE, Passport & Family Book Services', 'جواز السفر وخلاصة القيد', 'Passport renewals, family book updates, and citizen documentation for UAE Nationals.', 'تجديد جوازات السفر وتحديث خلاصة القيد وتوثيق المنح لمواطني دولة الإمارات.', 'Crown', 13, 0, 'active'),
('traffic-dept', 'traffic-dept-services', 'Traffic Dept Services', 'خدمات إدارة المرور', 'Driving license renewal, traffic code opening, international driving permits, and test booking.', 'تجديد رخص القيادة، فتح الرمز المروري، رخص القيادة الدولية وحجز الفحص.', 'Car', 14, 0, 'active'),
('insurance', 'insurance-services', 'Insurance Services', 'خدمات التأمين', 'Daman basic and comprehensive health insurance, domestic worker policies, and vehicle insurance.', 'التأمين الصحي ضمان والشامل، تأمين العمالة المنزلية، وتأمين السيارات الشامل.', 'ShieldCheck', 15, 0, 'active'),
('uae-pass', 'uae-pass-services', 'UAE PASS', 'الهوية الرقمية (UAE PASS)', 'Account creation, facial biometrics verification, account upgrade, and digital signature setup.', 'المساعدة في التسجيل وإعداد الهوية الرقمية الوطنية وتوثيق البصمة والتوقيع الرقمي.', 'Sparkles', 16, 0, 'active'),
('certificate-attestation', 'certificate-attestation', 'Certificate Attestation', 'تصديق الشهادات', 'MOFA degree attestation, marriage & birth certificates, commercial invoices & embassy stamps.', 'تصديق وزارة الخارجية للشهادات الجامعية، عقود الزواج والميلاد وتصديق السفارات.', 'FileBadge', 17, 1, 'active'),
('police-clearance', 'police-clearance-certificate', 'Police Clearance Certificate', 'شهادة حسن سيرة وسلوك', 'Criminal status clearance & Good Conduct certificates from Abu Dhabi Police and MOI.', 'استخراج شهادة بحث الحالة الجنائية وحسن السيرة والسلوك للتوظيف والهجرة.', 'BadgeCheck', 18, 0, 'active'),
('emirates-id', 'emirates-id-services', 'Emirates ID Services', 'خدمات الهوية الإماراتية', 'New issuance, renewal, lost ID replacement, details modification, and biometrics booking.', 'طباعة طلبات الهوية الإماراتية الجديدة، التجديد، بدل فاقد/تالف، وتعديل البيانات.', 'IdCard', 19, 1, 'active'),
('translation', 'legal-normal-translation', 'Legal & Normal Translation', 'الترجمة القانونية والعادية', 'Ministry of Justice (MOJ) certified translations, legal agreements, medical and technical texts.', 'ترجمة قانونية معتمدة من وزارة العدل ومقبولة لدى كافة المحاكم والسفارات والوزارات.', 'Languages', 20, 0, 'active'),
('darb', 'abu-dhabi-toll-darb', 'Abu Dhabi Toll Gate (DARB)', 'بوابات التعرفة المرورية (درب)', 'DARB account registration, vehicle tag activation, balance top-ups, and fine grievances.', 'تسجيل الحساب وربط المركبات بنظام التعرفة المرورية (درب) وشحن الرصيد والاعتراضات.', 'MapPin', 21, 0, 'active'),
('mawaqif', 'mawaqif-parking', 'Mawaqif', 'مواقف', 'Residential parking permits, multi-car villa permits, balance top-up, and violation disputes.', 'تصاريح مواقف السكان والفلل، إدارة الحساب وشحن الرصيد وتسوية المخالفات.', 'MapPin', 22, 0, 'active'),
('vehicle-registration', 'vehicle-registration-renewal', 'Vehicle Registration', 'ملكية وتجديد المركبات', 'Mulkiya renewal, vehicle ownership transfer, export clearance, and plate number bookings.', 'تجديد بطاقة تسجيل المركبة (الملكية)، نقل الملكية، شهادات التصدير وأرقام اللوحات.', 'Car', 23, 0, 'active'),
('business-setup', 'business-setup-added', 'Business Setup', 'تأسيس الشركات', 'ADDED commercial license issuance, initial approvals, MOA typing, and trade name reservation.', 'إصدار وتجديد الرخص التجارية، حجز الاسم التجاري، عقود التأسيس والموافقات المبدئية.', 'Building2', 24, 1, 'active'),
('fine-reduction', 'vehicle-fine-reduction', 'Vehicle Fine Reduction', 'تخفيض المخالفات المرورية', 'Applications for Abu Dhabi traffic fine discounts, installment plans, and black point waivers.', 'معالجة طلبات خصم المخالفات المرورية، خطط التقسيط البنكية، وإسقاط النقاط المرورية.', 'Clock', 25, 0, 'active'),
('adfca', 'abu-dhabi-food-control', 'Abu Dhabi Food Control Authority', 'هيئة أبوظبي للزراعة والسلامة الغذائية', 'Food facility licensing NOCs, food safety training (EFST), and kitchen compliance approvals.', 'التراخيص والموافقات للمنشآت والمطابخ الغذائية ودورات سلامة الغذاء المعتمدة.', 'CheckCircle', 26, 0, 'active');

-- -------------------------------------------------------------
-- SEED DATA: SUBCATEGORIES
-- -------------------------------------------------------------
INSERT INTO `subcategories` (`id`, `category_id`, `slug`, `name_en`, `name_ar`, `display_order`, `status`) VALUES
('sub-tasheel-labour', 'tasheel', 'labour-services', 'Labour Services & Work Permits', 'خدمات تصاريح وعقود العمل', 1, 'active'),
('sub-tasheel-est', 'tasheel', 'establishment-services', 'Establishment & Quota Services', 'خدمات المنشأة وتعديل الكوتا', 2, 'active'),
('sub-tasheel-wps', 'tasheel', 'wps-complaints', 'WPS & Labor Complaints', 'نظام حماية الأجور والشكاوى العمالية', 3, 'active'),
('sub-family-residency', 'family-visa', 'spouse-children-visa', 'Spouse & Children Visa', 'إقامة الزوجة والأبناء', 1, 'active'),
('sub-family-parents', 'family-visa', 'parents-visa', 'Parents Visa Sponsorship', 'إقامة الوالدين', 2, 'active'),
('sub-family-newborn', 'family-visa', 'newborn-visa', 'Newborn Visa & Emirates ID', 'إقامة وهوية المواليد الجدد', 3, 'active'),
('sub-visit-tourist', 'visit-visa', 'tourist-visas', 'Tourist & Visit Permits (30/60 Days)', 'تأشيرات السياحة والزيارة (30/60 يوماً)', 1, 'active'),
('sub-eid-issuance', 'emirates-id', 'id-issuance-renewal', 'New Issuance & Renewal', 'إصدار جديد وتجديد الهوية', 1, 'active'),
('sub-eid-replacement', 'emirates-id', 'id-replacement', 'Lost / Damaged Replacement', 'بدل فاقد/تالف وتحديث البيانات', 2, 'active'),
('sub-business-licensing', 'business-setup', 'commercial-licenses', 'Commercial License Issuance & Renewal', 'إصدار وتجديد الرخص التجارية', 1, 'active'),
('sub-attest-degrees', 'certificate-attestation', 'educational-degrees', 'Educational & University Degrees', 'تصديق المؤهلات والشهادات الجامعية', 1, 'active');

-- -------------------------------------------------------------
-- SEED DATA: SAMPLE CORE SERVICES
-- -------------------------------------------------------------
INSERT INTO `services` (`id`, `category_id`, `subcategory_id`, `slug`, `title_en`, `title_ar`, `short_desc_en`, `short_desc_ar`, `desc_en`, `desc_ar`, `govt_fee`, `typing_fee`, `estimated_cost_standard`, `estimated_cost_express`, `processing_time_en`, `processing_time_ar`, `featured`, `popular`, `display_order`, `status`) VALUES
('tasheel-new-permit', 'tasheel', 'sub-tasheel-labour', 'new-work-permit', 'New Electronic Work Permit Application', 'إصدار تصريح عمل إلكتروني جديد', 'Submission and typing of initial employment offer letters and electronic work permits for new hires.', 'طباعة وتقديم عروض العمل وتصاريح العمل الإلكترونية للموظفين الجدد.', 'Full processing for new employee electronic work permits through MOHRE portals with document verification.', 'معاملة شاملة لإصدار تصاريح العمل الإلكترونية للعمالة الجديدة عبر منصة وزارة العمل.', 200.00, 50.00, 250.00, 380.00, '24-48 Hours', '24 - 48 ساعة', 1, 1, 1, 'active'),
('tasheel-permit-renewal', 'tasheel', 'sub-tasheel-labour', 'work-permit-renewal', 'Work Permit & Labour Card Renewal', 'تجديد تصريح وبطاقة العمل', 'Fast renewal of expiring electronic work permits and MOHRE labor contracts for employees.', 'تجديد تصاريح العمل وعقود العمل الإلكترونية المنتهية للعمال والموظفين.', 'Timely renewal of company employee labor cards to avoid MOHRE delay fines and maintain legal status.', 'تجديد بطاقات العمل لتفادي غرامات وزارة الموارد البشرية وضمان الامتثال القانوني للمنشأة.', 250.00, 50.00, 300.00, 450.00, '24 Hours', '24 ساعة', 1, 1, 2, 'active'),
('family-spouse-residence', 'family-visa', 'sub-family-residency', 'family-residency-visa', 'Family Visa - Spouse & Children Residence', 'إقامة الزوجة والأبناء - تأشيرة العائلة', 'Complete residency sponsorship processing including file opening, entry permit, medical and Emirates ID.', 'معاملة متكاملة لكفالة إقامة الزوجة والأبناء تشمل فتح الملف، إذن الدخول، الفحص الطبي والهوية.', 'Comprehensive family visa typing and sponsorship clearance across ICP and Abu Dhabi immigration portals.', 'إنجاز شامل لمعاملات كفالة الأسرة وتثبيت الإقامة عبر الهيئة الاتحادية للهوية والجنسية بأبوظبي.', 300.00, 80.00, 380.00, 550.00, '2-3 Days', '2-3 أيام', 1, 1, 3, 'active'),
('mofa-degree-attestation', 'certificate-attestation', 'sub-attest-degrees', 'mofa-degree-attestation', 'MOFA University Degree Attestation', 'تصديق المؤهلات والشهادات الجامعية - الخارجية', 'Official degree attestation from Ministry of Foreign Affairs UAE with embassy stamps and verification.', 'تصديق الشهادات والدرجات العلمية من وزارة الخارجية والتعاون الدولي والسفارات المعتمدة.', 'Fast-track attestation for university degrees, school diplomas, and academic certificates for UAE employment.', 'تصديق سريع للمؤهلات الجامعية والدبلومات المدرسية والشهادات الأكاديمية لأغراض التوظيف وتعديل المهنة.', 150.00, 50.00, 200.00, 300.00, '24 Hours', '24 ساعة', 1, 1, 4, 'active');

SET FOREIGN_KEY_CHECKS = 1;
