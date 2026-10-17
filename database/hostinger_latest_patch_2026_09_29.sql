-- ==============================================================================
-- Prime Time Typing Services – Hostinger Latest Patch (29th Sep 2026)
-- Target Database: u728809788_prime_time (or your Hostinger MySQL DB)
-- Purpose: 
--   1. Adds `banners` table with updated 'Since 25th Sep 2026' slides
--   2. Adds `website_settings` table with new Instagram account and About info
--   3. Synchronizes `categories` table with all 26 official categories
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
-- 1. HERO BANNERS TABLE & SEED
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
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `banners` (`id`, `badge_en`, `badge_ar`, `title_en`, `title_ar`, `desc_en`, `desc_ar`, `image`, `cta_text_en`, `cta_text_ar`, `cta_url`, `display_order`, `status`) VALUES
('slide1', 'Since 25th Sep 2026 • Official UAE Clearance', 'منذ 25 سبتمبر 2026 • معاملات حكومية معتمدة', 'Fast & Accurate Typing Services in Abu Dhabi', 'خدمات الطباعة والمعاملات الحكومية الأسرع والأكثر دقة في أبوظبي', 'Professional handling for ICP Residency, MOHRE Work Permits, TAMM Portal, ADJD Court documents, and Legal Attestations.', 'إنهاء احترافي لإقامات ICP، تصاريح MOHRE، منصة تم TAMM، معاملات دائرة القضاء وتصديق الشهادات.', '/banners/slide1.jpg', 'Explore Services', 'استكشف الخدمات', '#services', 1, 'active'),
('slide2', 'Golden Visa & Family Sponsorship', 'التأشيرة الذهبية ورعاية كفالة الأسر', 'Seamless Residency & Labour Visa Processing', 'معاملات الإقامة وتصاريح العمل بسرعة وشفافية مطلقة', 'Full-service visa issuing, medical fitness booking, Emirates ID typing, and status changes for individuals and corporates.', 'إصدار التأشيرات، حجز الفحص الطبي، طباعة الهوية الإماراتية، وتعديل الوضع للأفراد والشركات.', '/banners/slide2.jpg', 'Explore Services', 'استكشف الخدمات', '#services', 2, 'active'),
('slide3', 'Corporate Legal Attestation & TAMM', 'التصديقات القانونية والمعاملات المؤسسية', 'Complete Business Setup & Certificate Attestation', 'تخليص المعاملات التجارية وتصديق الوثائق الرسمية', 'Fast-track company formation, MOFA attestations, Chamber of Commerce, and legal document translations.', 'تأسيس الشركات، تصديق الشهادات والوثائق من الخارجية، واعتماد الوكالات القانونية في أبوظبي.', '/banners/slide3.jpg', 'Explore Services', 'استكشف الخدمات', '#services', 3, 'active')
ON DUPLICATE KEY UPDATE 
  `badge_en` = VALUES(`badge_en`),
  `badge_ar` = VALUES(`badge_ar`),
  `title_en` = VALUES(`title_en`),
  `title_ar` = VALUES(`title_ar`),
  `desc_en` = VALUES(`desc_en`),
  `desc_ar` = VALUES(`desc_ar`);

-- -------------------------------------------------------------
-- 2. WEBSITE SETTINGS (INSTAGRAM & ABOUT INFO)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `website_settings` (
  `setting_key` VARCHAR(100) PRIMARY KEY,
  `setting_value` LONGTEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `website_settings` (`setting_key`, `setting_value`) VALUES
('social_links', '{"facebook":"https://www.facebook.com/share/19o6d1XPGY/","twitter":"","linkedin":"https://www.linkedin.com/company/primetime-typing","instagram":"https://www.instagram.com/primetime_typing?stkn=b2RrcHNiM3BkcjZs","youtube":""}'),
('seo_settings', '{"globalTitle":"Prime Time Typing Services | Professional Typing & Document Clearing - Abu Dhabi","globalDescription":"Authorized UAE government typing and corporate document clearance center in Abu Dhabi. Fast processing for Tasheel, MOHRE, ICP Residency, Emirates ID, Tamm, ADJD, and MOFA Attestation.","keywords":"typing center abu dhabi, tasheel services abu dhabi, residency visa typing, emirates id center, tamm portal assistance, mofa attestation uae, prime time typing","ogImage":"https://primetimetypingservice.com/prime_time_logo.jpeg","googleAnalyticsId":"G-PTT9042UAE","googleSearchConsole":"google-site-verification=ptt-adm-99214-verification"}'),
('about_settings', '{"badgeEn":"Trusted Government Typing Hub","badgeAr":"مركز طباعة حكومي معتمد","headingEn":"Accurate Typing Solutions at Prime Time Typing","headingAr":"خدمات طباعة سريعة ودقيقة لدى برايم تايم","desc1En":"Prime Time Typing Services is a trusted provider of professional typing and corporate services, dedicated to addressing the diverse needs of individuals and businesses across the UAE. Conveniently located Near Meat Mart, Madinat Zayed, Abu Dhabi, Prime Time has built a reputation for reliability, accuracy, and efficiency.","desc1Ar":"برايم تايم لخدمات الطباعة هو مركزك الموثوق لإنجاز وتخليص كافة المعاملات الحكومية والمؤسسية في دولة الإمارات العربية المتحدة. يقع مركزنا بالقرب من ميت مارت، مدينة زايد، أبوظبي، حيث نفخر بتقديم حلول توثيق تمتاز بالدقة المتناهية والسرعة الفائقة والاحترافية العالية.","desc2En":"Providing flawless, certified documentation and support solutions, we stand as a dependable partner for clients seeking hassle-free services tailored to their unique requirements.","desc2Ar":"نلتزم بتقديم حلول تخليص معاملات حكومية تمتاز بالدقة والسرعة لمرافقة عملائنا لإنهاء كافة الإجراءات بكل سلاسة ويسر.","stats":[{"id":"stat-1","value":"2026","label":{"en":"Since 25th Sep 2026","ar":"منذ 25 سبتمبر 2026"}},{"id":"stat-2","value":"100%","label":{"en":"Legal Precision","ar":"دقة قانونية معتمدة"}},{"id":"stat-3","value":"99.8%","label":{"en":"Satisfaction Rate","ar":"نسبة رضا المتعاملين"}},{"id":"stat-4","value":"10+","label":{"en":"Govt Portals Supported","ar":"بوابات ودوائر حكومية معتمدة"}}]}')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);

-- -------------------------------------------------------------
-- 3. CATEGORIES TABLE SYNC
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` VARCHAR(100) PRIMARY KEY,
  `slug` VARCHAR(120) NOT NULL,
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

-- Sync from service_categories if it exists
INSERT IGNORE INTO `categories` (`id`, `slug`, `name_en`, `name_ar`, `desc_en`, `desc_ar`, `icon`, `display_order`, `status`)
SELECT `id`, `slug`, `name_en`, `name_ar`, `desc_en`, `desc_ar`, `icon`, `display_order`, `status` FROM `service_categories`;

-- -------------------------------------------------------------
-- 4. ADMINISTRATOR ACCOUNT & PASSWORD (Pr!meadm!n@2026)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'Super Admin',
  `status` VARCHAR(20) DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `name`, `email`, `username`, `password_hash`, `role`, `status`) VALUES
(1, 'Super Administrator', 'admin@primetimetyping.com', 'admin', '$2y$12$VeYtKkXMkvLWB.v3tIKu5eLPI2T7Q.FAmpfF0Jxjh8vj2T9WhBrM2', 'Super Admin', 'active')
ON DUPLICATE KEY UPDATE `password_hash` = VALUES(`password_hash`);

SET FOREIGN_KEY_CHECKS = 1;
