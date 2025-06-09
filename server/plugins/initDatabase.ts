import { createDatabase } from 'db0'
import postgresql from 'db0/connectors/postgresql'

export default defineNitroPlugin(async () => {
  if (process.env.APP_ENV === 'build') {
    console.log('[server/plugins/initDatabase.ts] Skipping init database, in build context')
    return
  }
  const db = useDatabase()

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
})
