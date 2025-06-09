import db from '~/server/lib/database'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  if (!query.blogId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required query: blogId',
    })
  }
  const existingLikes = db
    .prepare('SELECT count FROM likes WHERE blog_id = ?')
    .get(query.blogId as string) as {
    count: number
  }

  return db
    .prepare(`UPDATE likes SET count = ${existingLikes.count} + 1 WHERE blog_id = ?`)
    .run(query.blogId as string)
})
