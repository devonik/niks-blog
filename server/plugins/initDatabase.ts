import { createDatabase } from 'db0'
import mysql from 'db0/connectors/mysql2'
export default defineNitroPlugin(async () => {
  const db = createDatabase(
    mysql({
      uri: process.env.DB_URI,
    }),
  )
  db.exec('SELECT VERSION();')

  db.exec('CREATE DATABASE IF NOT EXISTS `blog`')
  db.exec(
    'CREATE TABLE IF NOT EXISTS `blog`.`comments` (`id` INT AUTO_INCREMENT PRIMARY KEY, `text` TEXT NOT NULL, `author` VARCHAR(255) NOT NULL, `published` BOOLEAN DEFAULT 0, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
  )
})
