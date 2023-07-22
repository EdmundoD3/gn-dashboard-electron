import sqlite from 'sqlite3'
import tables from '../sql/tables.js'
const sqlite3 = sqlite.verbose()
// Use the absolute address of the database file
// const path = `${__dirname}\\data.db`
const path = `./data.db`

const database = {
  count: async ({ nameOfTable = '' }) => {
    const sqliteCode = `SELECT COUNT(*) FROM ${nameOfTable}; GO`
    return new Promise((resolve, reject) => {
      let db = openDatabase(reject)

      db.all(sqliteCode, [], (err, rows) => {
        if (err) reject(err)
        resolve({ count: rows[0]['COUNT(*)'] })
      })
      db.close()
    })
  },
  get: async ({ table, sqliteCode }) => {
    return new Promise((resolve, reject) => {
      let db = openDatabase(reject)

      db.run(table)
      db.all(sqliteCode, [], (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
      db.close()
    })
  },
  post: async ({ table, insert, tableName }) => {
    return new Promise((resolve, reject) => {
      let db = openDatabase(reject)
      try {
        db.run(table)
        db.all(insert)
        db.all(
          ` SELECT * FROM ${tableName} WHERE id = (SELECT MAX(id) FROM ${tableName}) `,
          [],
          (err, rows) => {
            if (err) reject(err)
            resolve(rows)
          }
        )
      } catch (error) {
        reject(error)
      }

      db.close()
    })
  },
  put: async ({ table, update, sqliteCode }) => {
    return new Promise((resolve, reject) => {
      let db = openDatabase(reject)
      try {
        db.run(table)
        db.all(update).all(sqliteCode, [], (err, rows) => {
          if (err) reject(err)
          resolve(rows)
        })
      } catch (error) {
        reject(error)
      }
      db.close()
    })
  },
  delete: async ({ table, sqliteDelete }) => {
    return new Promise((resolve, reject) => {
      let db = openDatabase(reject)
      try {
        db.run(table)
        db.all(sqliteDelete, [], (err, rows) => {
          if (err) reject(err)
          resolve(rows)
        })
      } catch (error) {
        reject(error)
      }
      db.close()
    })
  },
  initializate: async () => {
    return new Promise((resolve, reject) => {
      let db = openDatabase(reject)
      // const tables = require('../sql/tables.js')
      // const initTables = Object.values(tables).reduce((previousValue,currentValue)=>`${previousValue}\
      // ${currentValue}`,"")
      Object.values(tables).forEach((table) => db.run(table))

      db.close()
    })
  }
}

const openDatabase = (reject) =>
  new sqlite3.Database(path, (err) => {
    if (err) reject({ error: err.message })
  })

export default database
