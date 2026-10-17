-- ==============================================================================
-- Prime Time Typing Services – Hostinger SQL Patch (11th Oct 2026)
-- Target Database: Hostinger MySQL Database (e.g. u728809788_prime_time)
-- Purpose:
--   1. Update Facebook Account URL to: https://www.facebook.com/share/19o6d1XPGY/
--   2. Update Global SEO & Search Console / Analytics Configuration
-- ==============================================================================

-- Ensure website_settings table exists
CREATE TABLE IF NOT EXISTS `website_settings` (
  `setting_key` VARCHAR(100) PRIMARY KEY,
  `setting_value` LONGTEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1. UPDATE SOCIAL LINKS (with updated Facebook URL)
INSERT INTO `website_settings` (`setting_key`, `setting_value`) VALUES
('social_links', '{"facebook":"https://www.facebook.com/share/19o6d1XPGY/","twitter":"","linkedin":"https://www.linkedin.com/company/primetime-typing","instagram":"https://www.instagram.com/primetime_typing?stkn=b2RrcHNiM3BkcjZs","youtube":""}')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);

-- 2. UPDATE SEO SETTINGS
INSERT INTO `website_settings` (`setting_key`, `setting_value`) VALUES
('seo_settings', '{"globalTitle":"Prime Time Typing Services | Professional Typing & Document Clearing - Abu Dhabi","globalDescription":"Authorized UAE government typing and corporate document clearance center in Abu Dhabi. Fast processing for Tasheel, MOHRE, ICP Residency, Emirates ID, Tamm, ADJD, and MOFA Attestation.","keywords":"typing center abu dhabi, tasheel services abu dhabi, residency visa typing, emirates id center, tamm portal assistance, mofa attestation uae, prime time typing","ogImage":"https://primetimetypingservice.com/prime_time_logo.jpeg","googleAnalyticsId":"G-PTT9042UAE","googleSearchConsole":"google-site-verification=ptt-adm-99214-verification"}')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);

-- Verification query
SELECT * FROM `website_settings` WHERE `setting_key` IN ('social_links', 'seo_settings');
