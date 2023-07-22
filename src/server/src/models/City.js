import { city as table } from '../sql/tables.js'
import { CRUDForTablesWhitTwoRows as CRUD } from '../sql/modules.js'

const nameOfTable = 'city'
const City = CRUD({ nameOfTable, table })

export default City
