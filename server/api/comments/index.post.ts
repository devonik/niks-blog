import db from '~/server/lib/database'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const query = db.prepare('INSERT INTO blog.comments (text, author) VALUES (?, ?)')
  if (!body.text || !body.author) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: text, author',
    })
  }
  return query.run(body.text, body.author)
})
