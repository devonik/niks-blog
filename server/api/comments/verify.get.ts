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
  const dbQuery = db.prepare('INSERT INTO comments (blog_id, text, author) VALUES (?, ?, ?)')
  return dbQuery.run(query.blog_id as string, query.text as string, query.author as string)
})
