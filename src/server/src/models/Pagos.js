import { pagos as table } from '../sql/tables.js'
import database from '../db/database.js'
import { oneData } from '../sql/modules.js'

const nameOfTable = 'pagos'
const { putOneById, getOne, getLimit, deleteByOneData } = oneData({ nameOfTable, table })

const Pagos = {
  count: async () => await database.count({ nameOfTable }),
  get: getLimit,
  getById: async ({ id = '' }) => await getOne({ value: id, nameValue: 'id' }),
  getByCuentaId: async ({ cuentaId = 0 }) =>
    await getOne({ value: cuentaId, nameValue: 'cuenta_id' }),
  getByDate: async ({ date = '' }) => await getOne({ value: date, nameValue: 'date' }),
  getByDateMinMax: async ({ min = '', max = '', limit = 10, offset = 0 }) => {
    const sqliteCode = `SELECT * FROM ${nameOfTable} WHERE date BETWEEN ( ${min}, ${max} ) LIMIT ${limit} OFFSET ${offset}`
    return await database.get({ table, sqliteCode })
  },
  getByPago: async ({ min = 0, max = 0, limit = 10, offset = 0 }) => {
    const sqliteCode = `SELECT * FROM ${nameOfTable} WHERE pago BETWEEN ( ${min}, ${max} ) LIMIT ${limit} OFFSET ${offset}`
    return await database.get({ table, sqliteCode })
  },
  getByNoRecibo: async ({ noRecibo = '', limit = 10, offset = 0 }) =>
    await getOne({ value: noRecibo, nameValue: 'no_recibo', limit, offset }),
  post: async ({ cuentaId = 0, pago = '', date = '', noRecibo = '' }) => {
    const insert = `INSERT INTO ${nameOfTable} (cuenta_id, pago, date, no_recibo) VALUES ('${cuentaId}','${pago}','${date}','${noRecibo}')`
    return await database.post({ table, insert, tableName: `${nameOfTable}` })
  },
  put: async ({ id = '', cuentaId = 0, pago = '', date = '', noRecibo = '' }) => {
    const update = `UPDATE ${nameOfTable} SET cuenta_id = '${cuentaId}', pago='${pago}',date='${date}',no_recibo='${noRecibo}' WHERE id = ${id} `
    const sqliteCode = `SELECT * FROM ${nameOfTable} WHERE id = ${id}`
    return await database.put({ table, update, sqliteCode })
  },
  putCuentaId: async ({ id = '', cuentaId = '' }) =>
    await putOneById({ id, value: cuentaId, nameValue: 'cuenta_id' }),
  putPago: async ({ id = '', pago = '' }) =>
    await putOneById({ id, value: pago, nameValue: 'pago' }),
  putDate: async ({ id = '', date = '' }) =>
    await putOneById({ id, value: date, nameValue: 'date' }),
  putNoRecibo: async ({ id = '', noRecibo = '' }) =>
    await putOneById({ id, value: noRecibo, nameValue: 'no_recibo' }),
  deleteById: async ({ id }) => await deleteByOneData({ value: id, nameValue: 'id' }),
  nameOfTable
}

export default Pagos
