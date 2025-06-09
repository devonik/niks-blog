import { createDatabase } from 'db0'
import postgresql from 'db0/connectors/postgresql'
import sqlite from 'db0/connectors/better-sqlite3'

let db: ReturnType<typeof createDatabase>
export default function useDatabase() {
  if (process.env.APP_ENV === 'build') {
    console.log('[server/utils/useDatabase.ts] Skipping init useDatabase, in build context')
    return
  }

  const config = useRuntimeConfig()
  if (!config.databaseUrl) {
    throw new Error('ENV variable NUXT_DATABASE_URL is not configured')
  }

  if (db) return db
  db = createDatabase(
    postgresql({
      url: config.databaseUrl,
    }),
  )

  if (!db) {
    throw new Error('Failed to initialize database client')
  }

  // database is initialized, now we can run migrations
  db.exec(
    'CREATE TABLE IF NOT EXISTS comments' +
      '(id VARCHAR(255) NOT NULL, ' +
      'blog_id VARCHAR(50) NOT NULL,' +
      'text VARCHAR(255) NOT NULL, ' +
      'author VARCHAR(255) NOT NULL, ' +
      'published BOOLEAN DEFAULT FALSE, ' +
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
  )
  db.exec(
    'CREATE TABLE IF NOT EXISTS likes (blog_id VARCHAR(50) NOT NULL, count INTEGER DEFAULT 0 )',
  )

  return db
}
