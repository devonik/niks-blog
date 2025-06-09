import Database from 'better-sqlite3'
export default defineNitroPlugin(async () => {
  if (process.env.APP_ENV === 'build') {
    console.log('[server/plugins/initDatabase.ts] Skipping init database, in build context')
    return
  }
  const db = new Database('blog.db', { verbose: console.log })
  db.pragma('journal_mode = WAL')
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
})
