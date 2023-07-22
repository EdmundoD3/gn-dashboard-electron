const sqlData = {
  set: ({ ac, cv, index, object, condition }) =>
    !index ? `${ac} ${cv} = '${object[cv]}' ` : `${ac}${condition} ${cv} = '${object[cv]}' `,
  values: ({ ac, cv, index, object }) =>
    !index ? `${ac} '${object[cv]}' ` : `${ac}, '${object[cv]}' `,
  names: ({ ac, cv, index }) => (!index ? `${ac} '${cv}' ` : `${ac}, '${cv}' `)
}

const sqlUpdate = ({ setData, nameOfTable }) =>
  Object.keys(setData).reduce(
    (ac, cv, index) => sqlData.set({ ac, cv, index, object: setData, condition: ',' }),
    `UPDATE ${nameOfTable} SET `
  )

const sqlWhere = ({ where, condition }) =>
  Object.keys(where).reduce(
    (ac, cv, index) => sqlData.set({ ac, cv, index, object: where, condition }),
    `WHERE `
  )

const sqlInsert = ({ setData, nameOfTable }) =>
  Object.keys(setData).reduce(
    (ac, cv, index) => sqlData.names({ ac, cv, index }),
    `INSERT INTO ${nameOfTable} (`
  ) + ')'

const sqlValues = ({ setData }) =>
  Object.keys(setData).reduce(
    (ac, cv, index) => sqlData.values({ ac, cv, index, object: setData }),
    `VALUES (`
  ) + ');'

const sqlStatementForObjects = (nameOfTable) => {
  // Insert statement for SQL data
  const insertSqlData = ({ setData = {} }) => {
    const insert = sqlInsert({ setData, nameOfTable })
    const values = sqlValues({ setData })
    return `${insert} ${values}`
  }

  // Update statement for SQL data
  const updateSqlData = ({ setData = {}, where = {}, condition = 'and' }) => {
    const update = sqlUpdate({ setData, nameOfTable })
    const whereUpdate = sqlWhere({ where, condition })
    return `${update} ${whereUpdate})`
  }

  // Delete statement for SQL data
  const deleteSqlData = ({ where = {}, condition = 'and' }) => {
    const deleteStatement = `DELETE FROM ${nameOfTable} `
    const whereUpdate = sqlWhere({ where, condition })
    return `${deleteStatement} ${whereUpdate})`
  }

  // Select statement for SQL data
  const selectSqlData = ({ where = {}, condition = 'and' }) => {
    const selectStatement = `SELECT * FROM ${nameOfTable} `
    const whereUpdate = sqlWhere({ where, condition })
    return `${selectStatement} ${whereUpdate})`
  }

  return {
    insert: insertSqlData,
    update: updateSqlData,
    delete: deleteSqlData,
    select: selectSqlData
  }
}

export { sqlStatementForObjects }
