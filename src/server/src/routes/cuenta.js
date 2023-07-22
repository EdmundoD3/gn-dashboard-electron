import { Router } from 'express'
import { checkType } from './modules.js'
import Cuenta from '../models/Cuenta.js'

const router = Router()
const { isNumber, isString } = checkType

router.get('/id', async (req, res) => {
  const { limit = 10, offset = 0 } = req.body

  if (!limit && !offset) return res.status(403).json({ error: 'limit or offset not found' })
  if (!isNumber(limit) || !isNumber(offset))
    return res.status(403).json({ error: 'limit or offset is not a number' })
  try {
    const response = await Cuenta.get({ limit, offset })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})

router.get('/id', async (req, res) => {
  const { id = '' } = req.query
  if (!id) return res.status(403).json({ error: 'name not found' })
  if (!isString(name)) return res.status(403).json({ error: 'name is not string' })
  try {
    const response = await Cuenta.getById({ id })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})

router.get('/cliente_id', async (req, res) => {
  const { cliente_id = '' } = req.query
  if (!cliente_id) return res.status(403).json({ error: 'cliente_id not found' })
  if (!isString(name)) return res.status(403).json({ error: 'name is not string' })
  try {
    const response = await Cuenta.getByClientID({ clienteId: cliente_id })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})

router.post('/', async (req, res) => {
  const {
    name,
    lastName = '',
    email = '',
    phone = '',
    date = '',
    comments = '',
    cobradorId = '',
    statusId,
    mongodbId = '',
    vendedoraId
  } = req.body
  console.log(req.body, '85 Cuentas')
  if (!name && !statusId && !vendedoraId)
    return res.status(403).json({ error: 'ingrese un Cuenta' })
  try {
    const response = await Cuenta.post({
      name,
      lastName,
      email,
      phone,
      date,
      comments,
      cobradorId,
      statusId,
      mongodbId,
      vendedoraId
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

export default router
