import { vendedora as table } from '../sql/tables.js'
import { CRUDForTablesWhitTwoRows as CRUD } from '../sql/modules.js'

const Vendedora = CRUD({ nameOfTable: 'vendedora', table })

export default Vendedora
