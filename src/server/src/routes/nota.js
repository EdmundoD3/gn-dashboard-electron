import { Router } from 'express'
import Nota from '../models/Nota.js'

const router = Router()

router.post('/', async (req, res) => {
  const { cliente, addres, cuenta, compra } = req.body
  console.log('notas', { cliente, addres, cuenta, compra })
  if (!Array.isArray(compra)) return res.status(403).json({ error: 'bad data' })
  if (!cliente || !addres || !cuenta || !compra)
    return res.status(403).json({ error: 'missing data' })
  try {
    const response = await Nota.post({ cliente, addres, cuenta, compra })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    console.log('nota.js 18 error:', error)
    return res.status(400).json({ error: error })
  }
})

export default router
