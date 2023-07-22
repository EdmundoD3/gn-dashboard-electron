import { status as table } from '../sql/tables.js'
import { CRUDForTablesWhitTwoRows as CRUD } from '../sql/modules.js'

const Status = CRUD({ nameOfTable: 'status', table })

export default Status
