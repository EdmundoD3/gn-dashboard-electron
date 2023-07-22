import express from 'express'

import addres from './addres.js'
import city from './city.js'
import cliente from './cliente.js'
import cobrador from './cobrador.js'
import colonia from './colonia.js'
import compra from './compra.js'
import nota from './nota.js'
import pagos from './pagos.js'
import state from './state.js'
import status from './status.js'
import vendedora from './vendedora.js'

const router = express.Router()

router.use('/addres', addres)
router.use('/city', city)
router.use('/client', cliente)
router.use('/cobrador', cobrador)
router.use('/colonia', colonia)
router.use('/compra', compra)
router.use('/nota', nota)
router.use('/pagos', pagos)
router.use('/state', state)
router.use('/status', status)
router.use('/vendedora', vendedora)

export default router
