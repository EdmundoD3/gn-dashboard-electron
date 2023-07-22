import database from '../../db/database.js'

const oneData = ({ nameOfTable = '', table = '' }) => {
  return {
    getOne: async ({ value, nameValue, limit = 10, offset = 0 }) => {
      const lowValue = String(value).toLowerCase()
      const sqliteCode = `SELECT * FROM ${nameOfTable} WHERE ${nameValue} LIKE '%${lowValue}%' LIMIT ${limit} OFFSET ${offset}`
      return await database.get({ table, sqliteCode })
    },
    getSpecific: async ({ value, nameValue }) => {
      const lowValue = String(value).toLowerCase()
      const sqliteCode = `SELECT * FROM ${nameOfTable} WHERE ${nameValue} = '${lowValue}'`
      return await database.get({ table, sqliteCode })
    },
    getLimit: async ({ limit = 10, offset = 0 }) => {
      const sqliteCode = `SELECT * FROM ${nameOfTable} ORDER BY id LIMIT ${limit} OFFSET ${offset}`
      return await database.get({ table, sqliteCode })
    },
    postOne: async ({ value = '', nameValue = '' }) => {
      const lowValue = String(value).toLowerCase()
      const insert = `INSERT INTO ${nameOfTable} (${nameValue}) VALUES ('${lowValue}')`
      return await database.post({ table, insert, tableName: `${nameOfTable}` })
    },
    putOneById: async ({ id = '', value = '', nameValue = '' }) => {
      const lowValue = String(value).toLowerCase()
      const update = `UPDATE ${nameOfTable} SET ${nameValue} = '${lowValue}' WHERE id = '${id}'`
      const select = `SELECT * FROM ${nameOfTable} WHERE id = ${id}`
      return await database.put({ table, update, sqliteCode: select })
    },
    putOneByIdChange: async ({ id = '', value = '', nameValue = '' }) => {
      const lowValue = String(value).toLowerCase()
      const update = `UPDATE ${nameOfTable} SET ${nameValue} = '${lowValue}', ischange = 1 WHERE id = '${id}'`
      const select = `SELECT * FROM ${nameOfTable} WHERE id = ${id}`
      return await database.put({ table, update, sqliteCode: select })
    },
    deleteByOneData: async ({ value = '', nameValue = '' }) => {
      const sqliteDelete = `DELETE FROM ${nameOfTable} WHERE ${nameValue} = ${value}`
      return await database.delete({ table, sqliteDelete })
    }
  }
}

export { oneData }
