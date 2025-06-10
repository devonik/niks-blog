import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  if (!query.text || !query.author || !query.blog_id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: blog_id, text, author',
    })
  }

  const db = useDatabase()
  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database connection failed',
    })
  }
  const dbQuery = db.prepare('INSERT INTO comments (id, blog_id, text, author) VALUES (?, ?, ?, ?)')
  return dbQuery.run(uuidv4(), query.blog_id, query.text, query.author)
})
