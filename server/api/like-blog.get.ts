export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  if (!query.blogId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required query: blogId',
    })
  }
  const db = useDatabase()
  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database connection failed',
    })
  }

  const existingLikes = (await db
    .prepare('SELECT count FROM likes WHERE blog_id = ?')
    .get(query.blogId as string)) as { count: number }

  if (!existingLikes) {
    console.log('existingLikes undefined, inserting new like entry')
    db.prepare('INSERT INTO likes (blog_id, count) VALUES (?, ?)').run(query.blogId as string, 0)
  }

  return existingLikes.count || 0
})
