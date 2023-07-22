import database from '../../db/database.js'
import { oneData } from './oneData.js'

const CRUDForTablesWhitTwoRows = ({ nameOfTable, table }) => {
  const { getLimit, getOne, getSpecific, postOne, putOneById, deleteByOneData } = oneData({
    nameOfTable,
    table
  })

  return {
    count: async () => await database.count({ nameOfTable }),
    get: getLimit,
    getAll: async () => {
      const sqliteCode = `SELECT * FROM ${nameOfTable} ORDER BY ${nameOfTable}`
      return await database.get({ table, sqliteCode })
    },
    getById: async ({ id = '' }) => await getSpecific({ value: id, nameValue: 'id' }),
    getByName: async ({ value = '' }) =>
      await getOne({ value, nameValue: nameOfTable, limit: 10, offset: 0 }),
    getSpecificName: async ({ value = '' }) => await getSpecific({ value, nameValue: nameOfTable }),
    post: async ({ value = '' }) => await postOne({ value, nameValue: nameOfTable }),
    put: async ({ id = '', value = 0 }) => await putOneById({ id, value, nameValue: nameOfTable }),
    deleteById: async ({ id = '' }) => await deleteByOneData({ value: id, nameValue: 'id' }),
    nameOfTable
  }
}

export { CRUDForTablesWhitTwoRows }
