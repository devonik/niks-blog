import db from '~/server/lib/database'
import type { Comment } from '~/types'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  const body = await readBody<Comment>(event)

  const query = db.prepare('INSERT INTO comments (id, blog_id, text, author) VALUES (?, ?, ?, ?)')
  if (!body.text || !body.author || !body.blog_id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: blog_id, text, author',
    })
  }
  return query.run(uuidv4(), body.blog_id, body.text, body.author)
})
