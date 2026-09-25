-- ==============================================================================
-- Prime Time Typing Services – Hostinger MySQL Upgrade / Migration Script
-- Database: u728809788_prime_time
-- Purpose: Upgrades existing database to support full hierarchy:
--          Main Category -> Subcategory -> Service -> Documents -> FAQs
-- Safe Execution: Uses IF NOT EXISTS and checks before adding columns
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
-- 1. CREATE SUBCATEGORIES TABLE
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `subcategories` (
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
  INDEX (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 2. CREATE MASTER REQUIRED DOCUMENTS BANK TABLE
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `documents` (
  `id` VARCHAR(100) PRIMARY KEY,
  `name_en` VARCHAR(255) NOT NULL,
  `name_ar` VARCHAR(255) NOT NULL,
  `is_required` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 3. CREATE SERVICE REQUIRED DOCUMENTS RELATION TABLE
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `service_documents` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `service_id` VARCHAR(100) NOT NULL,
  `doc_name_en` VARCHAR(255) NOT NULL,
  `doc_name_ar` VARCHAR(255) NOT NULL,
  `is_mandatory` TINYINT(1) NOT NULL DEFAULT 1,
  `display_order` INT NOT NULL DEFAULT 1,
  INDEX (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 4. CREATE SERVICE-SPECIFIC FAQS TABLE
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `service_faqs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `service_id` VARCHAR(100) NOT NULL,
  `question_en` VARCHAR(255) NOT NULL,
  `question_ar` VARCHAR(255) NOT NULL,
  `answer_en` TEXT NOT NULL,
  `answer_ar` TEXT NOT NULL,
  `display_order` INT NOT NULL DEFAULT 1,
  INDEX (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 5. CREATE CUSTOMERS DIRECTORY TABLE
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `customers` (
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
-- 6. UPGRADE EXISTING `services` TABLE WITH MISSING COLUMNS
-- -------------------------------------------------------------
ALTER TABLE `services` 
  ADD COLUMN IF NOT EXISTS `subcategory_id` VARCHAR(100) DEFAULT NULL AFTER `category_id`,
  ADD COLUMN IF NOT EXISTS `govt_fee` DECIMAL(10,2) NOT NULL DEFAULT 0.00 AFTER `desc_ar`,
  ADD COLUMN IF NOT EXISTS `typing_fee` DECIMAL(10,2) NOT NULL DEFAULT 0.00 AFTER `govt_fee`,
  ADD COLUMN IF NOT EXISTS `estimated_cost_standard` DECIMAL(10,2) NOT NULL DEFAULT 0.00 AFTER `typing_fee`,
  ADD COLUMN IF NOT EXISTS `estimated_cost_express` DECIMAL(10,2) NOT NULL DEFAULT 0.00 AFTER `estimated_cost_standard`,
  ADD COLUMN IF NOT EXISTS `govt_fee_range_en` VARCHAR(100) DEFAULT 'AED 200 - 450' AFTER `estimated_cost_express`,
  ADD COLUMN IF NOT EXISTS `govt_fee_range_ar` VARCHAR(100) DEFAULT '200 - 450 درهم' AFTER `govt_fee_range_en`,
  ADD COLUMN IF NOT EXISTS `processing_time_en` VARCHAR(100) DEFAULT '24-48 Hours' AFTER `govt_fee_range_ar`,
  ADD COLUMN IF NOT EXISTS `processing_time_ar` VARCHAR(100) DEFAULT '24 - 48 ساعة' AFTER `processing_time_en`,
  ADD COLUMN IF NOT EXISTS `detailed_desc_en` LONGTEXT DEFAULT NULL AFTER `desc_ar`,
  ADD COLUMN IF NOT EXISTS `detailed_desc_ar` LONGTEXT DEFAULT NULL AFTER `detailed_desc_en`,
  ADD COLUMN IF NOT EXISTS `eligibility_en` TEXT DEFAULT NULL AFTER `detailed_desc_ar`,
  ADD COLUMN IF NOT EXISTS `eligibility_ar` TEXT DEFAULT NULL AFTER `eligibility_en`,
  ADD COLUMN IF NOT EXISTS `procedure_en` TEXT DEFAULT NULL AFTER `eligibility_ar`,
  ADD COLUMN IF NOT EXISTS `procedure_ar` TEXT DEFAULT NULL AFTER `procedure_en`,
  ADD COLUMN IF NOT EXISTS `important_notes_en` TEXT DEFAULT NULL AFTER `procedure_ar`,
  ADD COLUMN IF NOT EXISTS `important_notes_ar` TEXT DEFAULT NULL AFTER `important_notes_en`,
  ADD COLUMN IF NOT EXISTS `popular` TINYINT(1) NOT NULL DEFAULT 0 AFTER `featured`;

-- -------------------------------------------------------------
-- 7. SEED INITIAL MASTER DOCUMENTS BANK
-- -------------------------------------------------------------
INSERT IGNORE INTO `documents` (`id`, `name_en`, `name_ar`, `is_required`) VALUES
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
-- 8. SEED INITIAL SUBCATEGORIES FOR TASHEEL, TAMM, FAMILY VISAS & BUSINESS SETUP
-- -------------------------------------------------------------
INSERT IGNORE INTO `subcategories` (`id`, `category_id`, `slug`, `name_en`, `name_ar`, `display_order`, `status`) VALUES
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
-- 9. UPGRADE AND POPULATE ALL 26 OFFICIAL GOVERNMENT CATEGORIES INTO service_categories
-- -------------------------------------------------------------
ALTER TABLE `service_categories` 
  ADD COLUMN IF NOT EXISTS `desc_en` TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `desc_ar` TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `display_order` INT NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';

INSERT IGNORE INTO `service_categories` (`id`, `slug`, `name_en`, `name_ar`, `desc_en`, `desc_ar`, `icon`, `display_order`, `status`) VALUES
('tasheel', 'tasheel-services', 'Tasheel Services', 'خدمات تسهيل', 'MOHRE typing and processing for employment visas, labor cards, contract modifications and quotas.', 'طباعة وتخليص معاملات وزارة الموارد البشرية والتوطين وتصاريح العمل والكوتا.', 'Briefcase', 1, 'active'),
('tawjeeh', 'tawjeeh-services', 'Tawjeeh Services', 'خدمات توجيه', 'Mandatory labor awareness and training programs, certificate issuance, and worker contracts.', 'برامج التوعية والتدريب الإلزامية للعمال وإصدار شهادة توجيه المعتمدة.', 'Award', 2, 'active'),
('tadbeer', 'tadbeer-services', 'Tad-beer Services (Housemaid)', 'خدمات تدبير (العمالة المساعدة)', 'Sponsorship, entry permits, visa renewals and contract typing for domestic workers and maids.', 'خدمات كفالة واستقدام العمالة المساعدة وعمال الخدمة المنزلية وتجديد الإقامة.', 'Users', 3, 'active'),
('tamm', 'tamm-services', 'Tamm Services', 'خدمات تم (TAMM)', 'Unified Abu Dhabi government platform: driving, municipality, Tawtheeq tenancy & clearances.', 'منصة خدمات حكومة أبوظبي المتكاملة، معاملات البلدية وتوثيق عقود الإيجار.', 'Home', 4, 'active'),
('all-govt', 'all-govt-applications', 'All Kinds of Govt. Applications', 'كافة أنواع الطلبات الحكومية', 'General typing, urgent exemptions, special petitions, and electronic submissions across UAE portals.', 'طباعة وتقديم كافة المعاملات الحكومية الشاملة وطلبات الاسترحام والاستثناء.', 'FileCheck2', 5, 'active'),
('family-visa', 'family-visa-process', 'Family Visa Process', 'معاملات تأشيرة العائلة', 'Residency sponsorship for spouse, children, newborn babies and parents with VIP fast-tracking.', 'معاملات كفالة الإقامة للزوجة والأبناء والوالدين وإصدار إقامة المواليد الجدد.', 'Users', 6, 'active'),
('visit-visa', 'visit-visas', 'Visit Visas', 'تأشيرات الزيارة', '30 & 60 days tourist visas, multiple entry permits, family visit visas and status adjustments.', 'تأشيرات السياحة والزيارة 30 و60 يوماً وتأشيرات الدخول المتعدد وتمديد الزيارة.', 'Plane', 7, 'active'),
('civil-defence', 'civil-defence-services', 'Civil Defence', 'الدفاع المدني', 'Fire safety certificates, engineering drawing approvals, site inspections and commercial clearances.', 'موافقات المخططات الهندسية وشهادات استيفاء السلامة والتفتيش للرخص التجارية.', 'ShieldCheck', 8, 'active'),
('icp-gdrfa', 'immigration-icp-gdrfa', 'Immigration (ICP-GDRFA)', 'إدارة الهجرة (ICP-GDRFA)', 'Entry permits, status modification inside UAE, residency visa stamping and cancellation.', 'أذونات الدخول، تعديل الوضع داخل الدولة، تثبيت الإقامة وإلغاؤها وحل الغرامات.', 'Globe', 9, 'active'),
('ministry-labor', 'ministry-of-labor', 'Ministry of Labor', 'وزارة العمل', 'Establishment cards, company quota applications, labor disputes, and Wage Protection System (WPS).', 'بطاقات المنشأة، كوتا العمالة، النزاعات العمالية، ونظام حماية الأجور (WPS).', 'Briefcase', 10, 'active'),
('adjd', 'judicial-adjd-services', 'Judicial Dept (ADJD) Services', 'خدمات دائرة القضاء (ADJD)', 'Power of Attorney (POA) notarization, legal warnings, court registrations, and rental disputes.', 'توثيق الوكالات القانونية، الإنذارات العدلية، قيد الدعاوى ولجان المنازعات الإيجارية.', 'Building2', 11, 'active'),
('cnia-pass', 'cnia-security-pass', 'CNIA Pass Typing (Security Pass)', 'طباعة تصاريح (CNIA)', 'Critical National Infrastructure & Coastal Authority (CICPA) security passes for ports and fields.', 'تصاريح جهاز حماية المنشآت الحيوية والسواحل للموانئ وحقول النفط والغاز.', 'ShieldCheck', 12, 'active'),
('passport-family-book', 'passport-family-book', 'UAE, Passport & Family Book Services', 'جواز السفر وخلاصة القيد', 'Passport renewals, family book updates, and citizen documentation for UAE Nationals.', 'تجديد جوازات السفر وتحديث خلاصة القيد وتوثيق المنح لمواطني دولة الإمارات.', 'Crown', 13, 'active'),
('traffic-dept', 'traffic-dept-services', 'Traffic Dept Services', 'خدمات إدارة المرور', 'Driving license renewal, traffic code opening, international driving permits, and test booking.', 'تجديد رخص القيادة، فتح الرمز المروري، رخص القيادة الدولية وحجز الفحص.', 'Car', 14, 'active'),
('insurance', 'insurance-services', 'Insurance Services', 'خدمات التأمين', 'Daman basic and comprehensive health insurance, domestic worker policies, and vehicle insurance.', 'التأمين الصحي ضمان والشامل، تأمين العمالة المنزلية، وتأمين السيارات الشامل.', 'ShieldCheck', 15, 'active'),
('uae-pass', 'uae-pass-services', 'UAE PASS', 'الهوية الرقمية (UAE PASS)', 'Account creation, facial biometrics verification, account upgrade, and digital signature setup.', 'المساعدة في التسجيل وإعداد الهوية الرقمية الوطنية وتوثيق البصمة والتوقيع الرقمي.', 'Sparkles', 16, 'active'),
('certificate-attestation', 'certificate-attestation', 'Certificate Attestation', 'تصديق الشهادات', 'MOFA degree attestation, marriage & birth certificates, commercial invoices & embassy stamps.', 'تصديق وزارة الخارجية للشهادات الجامعية، عقود الزواج والميلاد وتصديق السفارات.', 'FileBadge', 17, 'active'),
('police-clearance', 'police-clearance-certificate', 'Police Clearance Certificate', 'شهادة حسن سيرة وسلوك', 'Criminal status clearance & Good Conduct certificates from Abu Dhabi Police and MOI.', 'استخراج شهادة بحث الحالة الجنائية وحسن السيرة والسلوك للتوظيف والهجرة.', 'BadgeCheck', 18, 'active'),
('emirates-id', 'emirates-id-services', 'Emirates ID Services', 'خدمات الهوية الإماراتية', 'New issuance, renewal, lost ID replacement, details modification, and biometrics booking.', 'طباعة طلبات الهوية الإماراتية الجديدة، التجديد، بدل فاقد/تالف، وتعديل البيانات.', 'IdCard', 19, 'active'),
('translation', 'legal-normal-translation', 'Legal & Normal Translation', 'الترجمة القانونية والعادية', 'Ministry of Justice (MOJ) certified translations, legal agreements, medical and technical texts.', 'ترجمة قانونية معتمدة من وزارة العدل ومقبولة لدى كافة المحاكم والسفارات والوزارات.', 'Languages', 20, 'active'),
('darb', 'abu-dhabi-toll-darb', 'Abu Dhabi Toll Gate (DARB)', 'بوابات التعرفة المرورية (درب)', 'DARB account registration, vehicle tag activation, balance top-ups, and fine grievances.', 'تسجيل الحساب وربط المركبات بنظام التعرفة المرورية (درب) وشحن الرصيد والاعتراضات.', 'MapPin', 21, 'active'),
('mawaqif', 'mawaqif-parking', 'Mawaqif', 'مواقف', 'Residential parking permits, multi-car villa permits, balance top-up, and violation disputes.', 'تصاريح مواقف السكان والفلل، إدارة الحساب وشحن الرصيد وتسوية المخالفات.', 'MapPin', 22, 'active'),
('vehicle-registration', 'vehicle-registration-renewal', 'Vehicle Registration', 'ملكية وتجديد المركبات', 'Mulkiya renewal, vehicle ownership transfer, export clearance, and plate number bookings.', 'تجديد بطاقة تسجيل المركبة (الملكية)، نقل الملكية، شهادات التصدير وأرقام اللوحات.', 'Car', 23, 'active'),
('business-setup', 'business-setup-added', 'Business Setup', 'تأسيس الشركات', 'ADDED commercial license issuance, initial approvals, MOA typing, and trade name reservation.', 'إصدار وتجديد الرخص التجارية، حجز الاسم التجاري، عقود التأسيس والموافقات المبدئية.', 'Building2', 24, 'active'),
('fine-reduction', 'vehicle-fine-reduction', 'Vehicle Fine Reduction', 'تخفيض المخالفات المرورية', 'Applications for Abu Dhabi traffic fine discounts, installment plans, and black point waivers.', 'معالجة طلبات خصم المخالفات المرورية، خطط التقسيط البنكية، وإسقاط النقاط المرورية.', 'Clock', 25, 'active'),
('adfca', 'abu-dhabi-food-control', 'Abu Dhabi Food Control Authority', 'هيئة أبوظبي للزراعة والسلامة الغذائية', 'Food facility licensing NOCs, food safety training (EFST), and kitchen compliance approvals.', 'التراخيص والموافقات للمنشآت والمطابخ الغذائية ودورات سلامة الغذاء المعتمدة.', 'CheckCircle', 26, 'active');

SET FOREIGN_KEY_CHECKS = 1;
