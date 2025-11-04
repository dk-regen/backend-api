-- Create database if not exists (should already exist from MYSQL_DATABASE, but ensure it)
CREATE DATABASE IF NOT EXISTS wallet_db;

-- Create user with access from any host
CREATE USER IF NOT EXISTS 'wallet_user'@'%' IDENTIFIED BY 'wallet_password';

-- Grant all privileges
GRANT ALL PRIVILEGES ON wallet_db.* TO 'wallet_user'@'%';

-- Flush privileges
FLUSH PRIVILEGES;

