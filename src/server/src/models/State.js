import { state as table } from '../sql/tables.js'
import { CRUDForTablesWhitTwoRows as CRUD } from '../sql/modules.js'

const State = CRUD({ nameOfTable: 'state', table })

export default State
