import Vendedora from '../models/Vendedora.js'
import { routersForOneData } from './modules.js'

const router = routersForOneData({ modelsFunction: Vendedora })
export default router
