import { useScheduler } from '#scheduler'

interface IGApiRefreshTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  permissions: string
}

export default defineNitroPlugin(async () => {
  if (process.env.APP_ENV === 'build') {
    console.log(
      '[server/plugins/refreshInstaToken.ts] Skipping starting scheduler, in build context',
    )
    return
  }
  const db = useDatabase()
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
