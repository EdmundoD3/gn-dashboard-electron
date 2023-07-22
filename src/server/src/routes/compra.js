import { Router } from 'express'
import compra from '../models/Compra.js'
import { checkType } from './modules.js'

const router = Router()

const { isNumber } = checkType
router.get('/', async (req, res) => {
  const { limit = 10, offset } = req.body
  if (!limit && !offset) return res.status(403).json({ error: 'limit or offset not found' })
  if (!isNumber(limit) || !isNumber(offset))
    return res.status(403).json({ error: 'limit or offset is not a number' })
  try {
    const response = await compra.get({ limit: 10, offset: 0 })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})
router.get('/:id', async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(403).json({ error: 'id not found' })
  try {
    const response = await compra.getById({ cuentaId: id })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})
router.get('/cuenta/:id', async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(403).json({ error: 'id not found' })
  try {
    const response = await compra.getByCuentaId({ cuentaId: id })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})
router.get('/product', async (req, res) => {
  const { productosId } = req.body
  if (!productosId) return res.status(403).json({ error: 'id not found' })
  try {
    const response = await compra.getByProductoId({ productosId })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})
router.post('/', async (req, res) => {
  const { productosId, cuentaId, cantidad } = req.body
  if (!productosId && !cuentaId && !cantidad)
    return res.status(403).json({ error: 'client not found' })
  try {
    const response = await compra.post({ productosId, cuentaId, cantidad })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})
router.put('/cantidad', async (req, res) => {
  const { id, cantidad } = req.body
  if (!id && !cantidad) return res.status(403).json({ error: 'id or cantidad not found' })
  try {
    const response = await compra.putCantidad({ id, cantidad })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})
router.put('/cantidad', async (req, res) => {
  const { id, productosId } = req.body
  if (!id && !productosId) return res.status(403).json({ error: 'id or product not found' })
  try {
    const response = await compra.putProductosId({ id, productosId })
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
    const response = await compra.deleteById({ id })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})
export default router
