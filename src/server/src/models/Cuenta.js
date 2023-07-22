import { cuenta as table } from '../sql/tables.js'
import database from '../db/database.js'
import { oneData } from '../sql/modules.js'

const nameOfTable = 'cuenta'
const { getOne, putOneById, getLimit, deleteByOneData } = oneData(nameOfTable, table)

const Cuenta = {
  count: async () => await database.count({ nameOfTable }),
  get: getLimit,
  getById: async ({ id = '' }) => await getOne({ value: id, nameValue: 'id' }),
  getByClientID: async ({ clienteId = 0 }) =>
    await getOne({ value: clienteId, nameValue: 'cliente_id' }),
  getByAbono: async ({ min = 0, max = 0 }) => {
    const sqliteCode = `SELECT * FROM ${nameOfTable} WHERE abono BETWEEN ${min} AND ${max}`
    return await database.get({ table, sqliteCode })
  },
  post: async ({
    clienteId,
    total,
    abono,
    date,
    contadoDate,
    ischange = 0,
    noCuenta,
    isActive = 0
  }) => {
    const insertInto = `INSERT INTO ${nameOfTable} (cliente_id, total, abono, date, contado_date, ischange, no_cuenta, is_active)`
    const values = ` VALUES ('${clienteId}', '${total}', '${abono}', '${date}', '${contadoDate}', '${ischange}', '${noCuenta}', '${isActive}')`
    const insert = insertInto + values
    return await database.post({ table, insert, tableName: nameOfTable })
  },
  postArray: async ({ cuenta = [] }) => {
    const insertable = `INSERT INTO ${nameOfTable} (cliente_id, total, abono, date, contado_date, ischange, no_cuenta, is_active)`
    const values =
      `VALUES ` +
      cuenta.reduce((prev, curr, index) => {
        const { clienteId, total, abono, date, contadoDate, ischange, noCuenta, isActive } = curr
        return `${prev}${
          !index ? '' : ','
        } ('${clienteId}', '${total}', '${abono}', '${date}', '${contadoDate}', '${ischange}', '${noCuenta}', '${isActive}')`
      }, '')
    const insert = insertable + values
    return await database.post({ table, insert, tableName: nameOfTable })
  },
  put: async ({
    id = '',
    clienteId,
    total,
    abono,
    date,
    contadoDate,
    ischange = 1,
    noCuenta,
    isActive = 0
  }) => {
    const set = `cliente_id=${clienteId}, total=${total}, abono=${abono}, date=${date}, contado_date=${contadoDate}, ischange=${ischange}, no_cuenta=${noCuenta}, is_active=${isActive}`
    const update = `UPDATE ${nameOfTable} SET ${set} WHERE id=${id}`,
      select = `SELECT * FROM ${nameOfTable} WHERE id=${id}`
    return await database.put({ table, update, sqliteCode: select })
  },
  putAbono: async ({ id = '', abono = '' }) =>
    await putOneById({ id, value: abono, nameValue: 'abono' }),
  putContadoDate: async ({ id = '', contadoDate }) =>
    await putOneById({ id, value: contadoDate, nameValue: 'contado_date' }),
  putTotal: async ({ id = '', total }) =>
    await putOneById({ id, value: total, nameValue: 'total' }),
  putIsChange: async ({ id = '', ischange }) =>
    await putOneById({ id, value: ischange, nameValue: 'ischange' }),
  deleteById: async ({ id }) => await deleteByOneData({ value: id, nameValue: 'id' }),
  nameOfTable
}

export default Cuenta
