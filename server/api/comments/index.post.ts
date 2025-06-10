import type { Comment } from '~/types'

import { sendMail } from '~/server/lib/emailService'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<Comment>(event)

  if (!body.text || !body.author || !body.blog_id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: blog_id, text, author',
    })
  }
  //Send email to me to verify the comment
  sendMail(
    config.email.username,
    'New comment on your blog',
    '',
    `<h1>New comment on your blog</h1>
    <ul>
      <li>Blog ID: ${body.blog_id}</li>
      <li>Comment: ${body.text}</li>
      <li>Author: ${body.author}</li>
    </ul>
    Approve it <a href="${config.public.baseUrl}/api/comments/verify?text=${encodeURIComponent(body.text)}&author=${encodeURIComponent(body.author)}&blog_id=${encodeURIComponent(body.blog_id)}">here</a>
  `,
  )

  return 'Waiting for verification'
})
