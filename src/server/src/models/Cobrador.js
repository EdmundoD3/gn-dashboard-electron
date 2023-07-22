import { cobrador as table } from '../sql/tables.js'
import { CRUDForTablesWhitTwoRows as CRUD } from '../sql/modules.js'

const nameOfTable = 'cobrador'
const Cobrador = CRUD({ nameOfTable, table })

export default Cobrador
