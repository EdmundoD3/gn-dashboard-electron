import Status from '../models/Status.js'
import { routersForOneData } from './modules.js'

const router = routersForOneData({ nameOfvalue: 'status', modelsFunction: Status })
export default router
