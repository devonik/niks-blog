import { createDatabase } from 'db0'
import sqlite from 'db0/connectors/better-sqlite3'

let db: ReturnType<typeof createDatabase>

export const useDatabase = () => {
  if (!db) {
    db = createDatabase(
      sqlite({
        name: 'blog.db',
      }),
    )
    db.exec(
      'CREATE TABLE IF NOT EXISTS comments' +
        '(id INTEGER, ' +
        'blog_id TEXT NOT NULL,' +
        'text TEXT NOT NULL, ' +
        'author VARCHAR(255) NOT NULL, ' +
        'published BOOLEAN DEFAULT 0, ' +
        'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
    )
    db.exec('CREATE TABLE IF NOT EXISTS likes (blog_id TEXT NOT NULL, count INTEGER DEFAULT 0 )')
  }
  return db
}
