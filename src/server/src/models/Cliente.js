import { cliente as table } from '../sql/tables.js'
import database from '../db/database.js'
import { oneData } from '../sql/modules.js'

const nameOfTable = 'cliente'
const { getOne, putOneById, getLimit, deleteByOneData } = oneData({ nameOfTable, table })

const Cliente = {
  count: async () => await database.count({ nameOfTable }),
  get: getLimit,
  getPersonalDates: async ({ name = '', lastName = '', phone = '' }) => {
    const sqliteCode = `SELECT * FROM ${nameOfTable} WHERE name LIKE '${name}%' and lastname LIKE '${lastName}%' and phone LIKE '${phone}%' Limit 10 Offset 0`
    return await database.get({ table, sqliteCode })
  },
  getById: async ({ id = '' }) => await getOne({ value: id, nameValue: 'id' }),
  getByName: async ({ name = '' }) => await getOne({ value: name, nameValue: 'name' }),
  getByCobradorId: async ({ cobradorId = 0 }) =>
    await getOne({ value: cobradorId, nameValue: 'cobrador_id' }),
  getByStatusId: async ({ statusId = 0 }) =>
    await getOne({ value: statusId, nameValue: 'status_id' }),
  getByVendedoraId: async ({ VendedoraId = 0 }) =>
    await getOne({ value: VendedoraId, nameValue: 'vendedora_id' }),
  getByMongoDbId: async ({ mongoDbId = 0 }) =>
    await getOne({ value: mongoDbId, nameValue: 'id_mdb' }),
  getByDate: async ({ date = '' }) => await getOne({ value: date, nameValue: 'date' }),
  getByDateParam: async ({ min = 0, max = 0 }) => {
    const sqliteCode = `SELECT * FROM ${nameOfTable} WHERE abono BETWEEN ${min} AND ${max}`
    return await database.get({ table, sqliteCode })
  },
  post: async ({
    name = '',
    lastName = '',
    email = '',
    phone = '',
    date = '',
    comments = '',
    cobradorId = '',
    statusId = '',
    mongodbId = '',
    vendedoraId = ''
  }) => {
    const insertInto = `INSERT INTO ${nameOfTable} (name,lastname,email,phone,date,comments,cobrador_id,status_id,id_mdb,vendedora_id)`
    const values = ` VALUES ('${name.toLowerCase()}','${lastName.toLowerCase()}','${email.toLowerCase()}','${phone}','${date}','${comments.toLowerCase()}','${cobradorId}','${statusId}','${mongodbId}','${vendedoraId}')`
    const insert = insertInto + values
    return await database.post({ table, insert, tableName: nameOfTable })
  },
  postArray: async ({ clients = [] }) => {
    const insertable = `INSERT INTO ${nameOfTable} (id,name,lastname,email,phone,date,comments,cobrador_id,status_id,id_mdb,vendedora_id)`
    const values =
      `VALUES ` +
      clients.reduce((prev, curr, index) => {
        const {
          name = '',
          lastName = '',
          email = '',
          phone = '',
          date = '',
          comments = '',
          cobradorId = '',
          statusId = '',
          mongodbId = '',
          vendedoraId = 0
        } = curr
        return `${prev}${
          index ? ',' : ''
        } ('${name.toLowerCase()}','${lastName.toLowerCase()}','${email.toLowerCase()}','${phone}','${date}','${comments.toLowerCase()}','${cobradorId}','${statusId}','${mongodbId}','${vendedoraId}')`
      }, '')
    const insert = insertable + values
    return await database.post({ table, insert, tableName: nameOfTable })
  },
  put: async ({
    id = 0,
    name = '',
    lastName = '',
    email = '',
    phone = '',
    date = '',
    comments = '',
    cobradorId = '',
    statusId = '',
    mongodbId = '',
    vendedoraId = 0,
    ischange = 0
  }) => {
    const set = `id=${id}, name='${name.toLowerCase()}', lastname='${lastName.toLowerCase()}', email='${email.toLowerCase()}', phone='${phone}', date='${date}', comments='${comments.toLowerCase()}', cobrador_id='${cobradorId}', status_id='${statusId}', id_mdb='${mongodbId}', vendedora_id='${vendedoraId}', ischange=${ischange}`
    const update = `UPDATE ${nameOfTable} SET ${set} WHERE id = ${id}`
    const select = `SELECT * FROM ${nameOfTable} WHERE id = ${id}`
    return await database.put({ table, update, sqliteCode: select })
  },
  putName: async ({ id = '', name = '' }) =>
    await putOneById({ id, value: name, nameValue: 'name' }),
  putLastName: async ({ id = '', lastName = '' }) =>
    await putOneById({ id, value: lastName, nameValue: 'lastName' }),
  putEmail: async ({ id = '', email = '' }) => {
    const { update, select } = putOneById({ id, value: email, nameValue: 'email' })
    return await database.put({ table, update, sqliteCode: select })
  },
  putPhone: async ({ id = '', phone = '' }) =>
    await putOneById({ id, value: phone, nameValue: 'phone' }),
  putMongodbId: async ({ id = '', mongodbId = '' }) =>
    await putOneById({ id, value: mongodbId, nameValue: 'id_mdb' }),
  putComments: async ({ id = '', comments = '' }) =>
    await putOneById({ id, value: comments, nameValue: 'comments' }),
  putIsChange: async ({ id = '', ischange = 0 }) =>
    await putOneById({ id, value: ischange, nameValue: 'ischange' }),
  deleteById: async ({ id }) => await deleteByOneData({ value: id, nameValue: 'id' })
}

export default Cliente
