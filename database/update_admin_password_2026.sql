-- ==============================================================================
-- Prime Time Typing Services – Admin Password Update Patch (Hostinger)
-- Target Database: u728809788_prime_time
-- ==============================================================================

-- 1. Create the `users` table expected by the system if it does not exist:
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

-- 2. Insert or update the administrator account with password 'Pr!meadm!n@2026':
INSERT INTO `users` (`id`, `name`, `email`, `username`, `password_hash`, `role`, `status`) VALUES
(1, 'Super Administrator', 'admin@primetimetyping.com', 'admin', '$2y$12$VeYtKkXMkvLWB.v3tIKu5eLPI2T7Q.FAmpfF0Jxjh8vj2T9WhBrM2', 'Super Admin', 'active')
ON DUPLICATE KEY UPDATE `password_hash` = VALUES(`password_hash`);
