import { productos as table } from '../sql/tables.js'
import database from '../db/database.js'
import { oneData } from '../sql/modules.js'

const nameOfTable = 'productos'
const { getOne, putOneById, getLimit, deleteByOneData } = oneData(nameOfTable, table)

const Productos = {
  count: async () => await database.count({ nameOfTable }),
  get: getLimit,
  getAll: async () => {
    const sqliteCode = `SELECT * FROM ${nameOfTable} ORDER BY nombre`
    return await database.get({ table, sqliteCode })
  },
  getById: async ({ id = '' }) => await getOne({ value: id, nameValue: 'id' }),
  getByName: async ({ nombre = '' }) => await getOne({ value: nombre, nameValue: 'nombre' }),
  post: async ({ nombre = '', contado = 0, credito = 0 }) => {
    const insert = `INSERT INTO ${nameOfTable} (nombre, contado, credito) VALUES ('${nombre}', ${contado}, ${credito})`
    return await database.post({ table, insert, tableName: `${nameOfTable}` })
  },
  putName: async ({ id = '', nombre = '' }) =>
    await putOneById({ id, value: nombre, nameValue: 'nombre' }),
  putPrice: async ({ id = '', contado, credito }) => {
    const update = `UPDATE ${nameOfTable} SET contado = ${contado}, credito = ${credito} WHERE id = ${id}`
    const sqliteCode = `SELECT * FROM ${nameOfTable} WHERE id = ${id}`
    return await database.put({ table: table, update: update, sqliteCode: sqliteCode })
  },
  deleteById: async ({ id }) => await deleteByOneData({ value: id, nameValue: 'id' })
}

export default Productos
