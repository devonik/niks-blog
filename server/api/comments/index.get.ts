import db from '~/server/lib/database'
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  if (!query.blogId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required query: blogId',
    })
  }
  return db.prepare('SELECT * from comments where blog_id = ?').all(query.blogId as string)
})
