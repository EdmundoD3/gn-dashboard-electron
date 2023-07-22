import { colonia as table } from '../sql/tables.js'
import { CRUDForTablesWhitTwoRows } from '../sql/modules.js'

const nameOfTable = 'colonia'
const Colonia = CRUDForTablesWhitTwoRows({ nameOfTable, table })

export default Colonia
