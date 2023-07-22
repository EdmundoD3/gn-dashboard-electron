const isValidValue = (value) => value !== null && value !== undefined && value !== ''
const generateSQLSelect = (tableName, data) => {
  const sqlValues = Object.entries(data).map(([key, value]) => {
    if (key === 'id') {
      return `${key} = ${value}`
    } else if (isValidValue(value)) {
      return `${key} LIKE '%${value}%'`
    }
    return null
  })

  const validSqlValues = sqlValues.filter((value) => value !== null)
  const sqlWhere = validSqlValues.join(' AND ')

  return `SELECT * FROM ${tableName} WHERE ${sqlWhere};`
}

const generateSQLInsert = (tableName, data) => {
  const columns = []
  const values = []

  for (const [key, value] of Object.entries(data)) {
    if (isValidValue(value) || value === 0) {
      columns.push(key)
      values.push(isValidValue(value) ? `'${value}'` : 'NULL')
    }
  }

  const columnsStr = columns.join(', ')
  const valuesStr = values.join(', ')

  const sql = `INSERT INTO ${tableName} (${columnsStr}) VALUES (${valuesStr});`
  return sql
}

export { generateSQLSelect, generateSQLInsert }
