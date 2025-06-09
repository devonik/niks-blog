import { createDatabase } from 'db0'
import postgresql from 'db0/connectors/postgresql'
import sqlite from 'db0/connectors/better-sqlite3'

let db: ReturnType<typeof createDatabase>
export default function useDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('ENV variable DATABASE_URL is not configured')
  }

  if (db) return db
  if (import.meta.dev) {
    console.log('is DEV')
    db = createDatabase(
      sqlite({
        name: ':memory:',
      }),
    )
  } else {
    db = createDatabase(
      postgresql({
        url: process.env.DATABASE_URL as string,
      }),
    )
  }

  if (!db) {
    throw new Error('Failed to initialize database client')
  }

  return db
}
