import { Router } from 'express'
import City from '../models/City.js'
import { pagination } from '../sql/modules/pagination.js'

const router = Router()

const { count, getPages } = pagination({ model: City })

router.get('/', getPages)

router.get('/count', count)

router.get('/city', async (req, res) => {
  const { city = '' } = req.body
  if (!city) return res.status(403).json({ error: 'limit or offset not found' })
  try {
    const response = await City.getByName({ value: city })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})

router.post('/', async (req, res) => {
  const { city } = req.body
  if (!city) return res.status(403).json({ error: 'enter a valid data *city*' })
  try {
    const isExist = await City.getByName({ value: city.toLowerCase() })
    if (isExist[0]) return res.status(403).json({ error: `${city} already exists in database` })
    const response = await City.post({ value: city.toLowerCase() })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: error })
  }
})
router.put('/', async (req, res) => {
  const { id, city } = req.body
  if (!id || !city) return res.status(403).json({ error: 'enter a valid data' })
  try {
    const isExist = await City.getByName({ value: city.toLowerCase() })
    if (isExist[0]) return res.status(403).json({ error: `${city} already exists in database` })
    const existId = await City.getById({ id })
    if (!existId[0]) return res.status(403).json({ error: `id: ${id} not exists in database` })
    const response = await City.put({ id, value: city.toLowerCase() })
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
    const response = await City.deleteById({ id })
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
