import { addres as table } from '../sql/tables.js'
import database from '../db/database.js'
import { oneData } from '../sql/modules.js'

const nameOfTable = 'addres'
const { getOne, putOneById, getLimit } = oneData({ nameOfTable, table })

const Addres = {
  count: async () => await database.count({ nameOfTable }),
  get: getLimit,
  getAddresDates: async ({ street = '', noaddress = '' }) => {
    const sqliteCode = `SELECT * FROM ${nameOfTable} WHERE street LIKE '${street}%' and noaddress LIKE '${noaddress}%' Limit 10 Offset 0`
    return await database.get({ table: table, sqliteCode: sqliteCode })
  },
  getById: async ({ id = '' }) => await getOne({ value: id, nameValue: 'id' }),
  getByclienteId: async ({ clienteId = 0 }) =>
    await getOne({ value: clienteId, nameValue: 'cliente_id' }),
  getByStateId: async ({ stateId = 0 }) => await getOne({ value: stateId, nameValue: 'state_id' }),
  getByColoniaId: async ({ coloniaId = 0 }) =>
    await getOne({ value: coloniaId, nameValue: 'colonia_id' }),
  getByCityId: async ({ cityId = 0 }) => await getOne({ value: cityId, nameValue: 'city_id' }),
  post: async ({
    clienteId = '',
    street = '',
    noAddress = '',
    betweenstreet = '',
    referencia = '',
    observation = '',
    stateId = '',
    coloniaId = '',
    cityId = ''
  }) => {
    const values = `('${clienteId}','${street.toLowerCase()}','${noAddress.toLowerCase()}','${betweenstreet.toLowerCase()}','${referencia.toLowerCase()}','${observation.toLowerCase()}','${stateId}','${coloniaId}','${cityId}')`
    const insert = `INSERT INTO ${nameOfTable} (cliente_id,street,noaddress,betweenstreet,referencia,observation,state_id,colonia_id,city_id)
    VALUES ${values}`
    return await database.post({ table, insert, tableName: `${nameOfTable}` })
  },
  put: async ({
    id = '',
    street = '',
    noAddress = '',
    betweenstreet = '',
    referencia = '',
    observation = '',
    stateId = 0,
    coloniaId = 0,
    cityId = 0
  }) => {
    const values = `street='${street.toLowerCase()}',noaddress='${noAddress.toLowerCase()}',betweenstreet='${betweenstreet.toLowerCase()}',referencia='${referencia.toLowerCase()}',observation='${observation.toLowerCase()}',state_id='${stateId}',colonia_id='${coloniaId}',city_id='${cityId}'`
    const update = `UPDATE ${nameOfTable} SET ${values} WHERE id = ${id} `
    const sqliteCode = `SELECT * FROM ${nameOfTable} WHERE id = ${id}`
    return await database.put({
      table: table,
      update: update,
      sqliteCode: sqliteCode
    })
  },
  putClientId: async ({ id = '', clienteId = '' }) =>
    await putOneById({ id, value: clienteId.toLowerCase(), nameValue: 'cliente_id' }),
  putReferencia: async ({ id = '', referencia = '' }) =>
    await putOneById({ id, value: referencia.toLowerCase(), nameValue: 'referencia' }),
  putObservation: async ({ id = '', observation = '' }) =>
    await putOneById({ id, value: observation.toLowerCase(), nameValue: 'observation' }),
  putAddress: async ({
    id = '',
    street = '',
    noAddress = '',
    betweenstreet = '',
    stateId = 0,
    coloniaId = 0,
    cityId = 0
  }) => {
    const values = `street='${street.toLowerCase()}',noaddress='${noAddress.toLowerCase()}',betweenstreet='${betweenstreet.toLowerCase()}',state_id='${stateId}',colonia_id='${coloniaId}',city_id='${cityId}'`
    const update = `UPDATE ${nameOfTable} SET ${values} WHERE id = ${id} `
    const sqliteCode = `SELECT * FROM ${nameOfTable} WHERE id = ${id}`
    return await database.put({
      table: table,
      update: update,
      sqliteCode: sqliteCode
    })
  },
  deleteById: async ({ id }) => {
    const sqliteDelete = `DELETE FROM ${nameOfTable} WHERE id = ${id}`
    return await database.delete({ table: table, sqliteDelete: sqliteDelete })
  }
}

export default Addres
