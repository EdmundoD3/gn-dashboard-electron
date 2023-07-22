import { Router } from 'express'
import Pagos from '../models/Pagos.js'
import { checkType } from './modules.js'
import { pagination } from '../sql/modules/pagination.js'
const { count, getPages } = pagination({ model: Pagos })
const { isInteger } = checkType
const router = Router()

router.get('/', getPages)
router.get('/count', count)

router.get('/recibo', async (req, res) => {
  const { noRecibo = '', limit = 10, offset = 0 } = req.query

  if (!isInteger(limit) || !isInteger(offset)) {
    return res.status(403).json({ error: 'Invalid limit or offset' })
  }

  if (!noRecibo) {
    return res.status(403).json({ error: 'No recibo provided' })
  }

  try {
    const response = await Pagos.getByNoRecibo({ noRecibo, limit, offset })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  const { cuentaId, pago, date, noRecibo } = req.body

  if (!cuentaId || !pago || !date || !noRecibo) {
    return res.status(403).json({ error: 'Missing data' })
  }

  try {
    const response = await Pagos.post({ cuentaId, pago, date, noRecibo })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.put('/', async (req, res) => {
  const { id, cuentaId, pago, date, noRecibo } = req.body

  if (!id || !isInteger(id)) {
    return res.status(403).json({ error: 'Invalid id' })
  }

  if (!cuentaId && !pago && !date && !noRecibo) {
    return res.status(403).json({ error: 'Invalid data' })
  }

  try {
    const response = await Pagos.put({ id, cuentaId, pago, date, noRecibo })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.delete('/', async (req, res) => {
  const { id } = req.body

  if (!id || !isInteger(id)) {
    return res.status(403).json({ error: 'Invalid id' })
  }

  try {
    const response = await Pagos.deleteById({ id })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

export default router
