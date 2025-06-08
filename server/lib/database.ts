import { createDatabase } from 'db0'
import mysql from 'db0/connectors/mysql2'

const db = createDatabase(
  mysql({
    uri: process.env.DB_URI,
  }),
)

export default db
