import db from '../../lib/database'
export default defineEventHandler(async (event) => {
  return db.exec('SELECT * FROM blog.comments')
})
