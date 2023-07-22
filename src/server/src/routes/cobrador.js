import Cobrador from '../models/Cobrador.js'
import { routersForOneData } from './modules.js'

const router = routersForOneData({ modelsFunction: Cobrador })
export default router
