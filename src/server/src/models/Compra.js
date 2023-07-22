import { compra as table } from '../sql/tables.js'
import database from '../db/database.js'
import { oneData } from '../sql/modules.js'

const nameOfTable = 'compra'
const { getOne, putOneById, getLimit, deleteByOneData } = oneData(nameOfTable, table)

const Compra = {
  count: async () => await database.count({ nameOfTable }),
  get: getLimit,
  getById: async ({ id = '' }) => await getOne({ value: id, nameValue: 'id' }),
  getByCuentaId: async ({ cuentaId = 0 }) =>
    await getOne({ value: cuentaId, nameValue: 'cuenta_id' }),
  getByProductoId: async ({ productosId = 0 }) =>
    await getOne({ value: productosId, nameValue: 'productos_id' }),
  post: async ({ productosId = 0, cuentaId = 0, cantidad = 0 }) => {
    const insert = `INSERT INTO ${nameOfTable} (productos_id, cuenta_id, cantidad) VALUES ('${productosId}','${cuentaId}','${cantidad}')`
    return await database.post({ table, insert, tableName: nameOfTable })
  },
  postArray: async ({ compra = [], cuentaId = '' }) => {
    const values = compra.reduce(
      (pv, cv) => `${pv}('${cv.productosId}','${cuentaId}','${cv.cantidad}') `,
      ''
    )
    const insert = `INSERT INTO ${nameOfTable} (productos_id, cuenta_id, cantidad) VALUES ${values}`
    return await database.post({ table, insert, tableName: nameOfTable })
  },
  putProductosId: async ({ id = '', productosId = 0 }) =>
    await putOneById({ id, value: productosId, nameValue: 'productos_id' }),
  putCantidad: async ({ id = '', cantidad = 0 }) =>
    await putOneById({ id, value: cantidad, nameValue: 'cantidad' }),
  deleteById: async ({ id }) => await deleteByOneData({ value: id, nameValue: 'id' }),
  nameOfTable
}

export default Compra
