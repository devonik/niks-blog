export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  if (!query.blogId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required query: blogId',
    })
  }
  console.log('test', process.env.POSTGRES_URL?.replace('sslmode=require', 'sslmode=disable'))
  return useDatabase()
    .prepare('SELECT * from comments where blog_id = ?')
    .all(query.blogId as string)
})
