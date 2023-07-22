import { Router } from 'express'
import Addres from '../models/Addres.js'
import City from '../models/City.js'
import Colonia from '../models/Colonia.js'
import State from '../models/State.js'
import { checkType, validate } from './modules.js'
import { pagination } from '../sql/modules/pagination.js'

const router = Router()

const { isString } = checkType

const { maxLength } = validate()

const { count, getPages } = pagination({ model: Addres })

router.get('/', getPages)

router.get('/count', count)

router.get('/data', async (req, res) => {
  const { cliente_id = '', street = '', noaddress = '' } = req.query

  try {
    if (cliente_id) {
      const response = await Addres.getByclienteId({ clienteId: cliente_id })
      return res.status(200).json({
        error: null,
        data: response
      })
    }
    if (!isString(street) && !isString(noaddress))
      return res.status(403).json({ error: 'name or lastname is not string' })
    const newStreet = maxLength({ val: street, maxlength: 120 })
    const newNoAddres = maxLength({ val: noaddress, maxlength: 120 })
    const response = await Addres.getAddresDates({ street: newStreet, noaddress: newNoAddres })
    const respons = await Promise.all(
      await response.map(async (e) => {
        const state = (await State.getById({ id: e['state_id'] })) || [{ state: '' }]
        const colonia = (await Colonia.getById({ id: e['colonia_id'] })) || [{ colonia: '' }]
        const city = (await City.getById({ id: e['city_id'] })) || [{ city: '' }]
        const newData = { ...state[0], ...colonia[0], ...city[0] }
        return { ...e, ...newData }
      })
    )
    return res.status(200).json({
      error: null,
      data: respons
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: error })
  }
})

router.post('/', async (req, res) => {
  const { clienteId, street, noAddress, betweenstreet } = req.body
  if (!clienteId && !street && !noAddress && !betweenstreet)
    return res.status(403).json({ error: 'ingrese un Cliente' })
  try {
    const response = await Addres.post({ clienteId, street, noAddress, betweenstreet })
    console.log(response)
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})
router.put('/', async (req, res) => {
  const {
    id,
    street = '',
    noAddress = '',
    betweenstreet = '',
    referencia = '',
    observation = '',
    stateId = 0,
    coloniaId = 0,
    cityId = 0
  } = req.body
  if (!id) return res.status(403).json({ error: 'ingrese un Cliente' })
  try {
    const response = await Addres.put({
      id,
      street,
      noAddress,
      betweenstreet,
      referencia,
      observation,
      stateId,
      coloniaId,
      cityId
    })
    console.log(response)
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})
router.delete('/', async (req, res) => {
  const { id } = req.body
  if (!id) return res.status(403).json({ error: 'id not found' })
  try {
    const response = await Addres.deleteById({ id })
    console.log(response)
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})

export default router
