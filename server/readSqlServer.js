const sql = require('mssql')

const sqlConfig = {
  domain: 'dsrm',
  user: process.env.WIN_USER,
  password: process.env.WIN_PASSWORD,
  server: process.env.SQL_SERVER,
  pool: {
    max: 10,
    min: 0
    // idleTimeoutMillis: 10000
  },
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}

async function readSqlServer (payload) {
  const {
    item_no,
  } = payload
  try {
    await sql.connect(sqlConfig)
    const response = {
      msg: 'No results',
      results: {
        item_no: item_no,
        // NAV
        desc_nav: null,
        exists_nav: false,
        list_price_nav: null,
        standard_cost_nav: null,
        // Experlogix
        desc_experlogix: null,
        exists_experlogix: false,
        list_price_experlogix: null
      }
    }
    // NAV
    const queryNav = `SELECT * FROM [${process.env.NAV_DATABASE}].dbo.[DS Master - LIVE$Item] where [No_] = '${item_no}'`
    const res = await sql.query(queryNav)

    if (res.rowsAffected[0] > 0) {
      const navItem = res.recordset[0]
      response.msg = 'Results from database'
      response.results.exists_nav = true
      response.results.desc_nav = navItem['Big Description']
      response.results.list_price_nav = navItem['Unit List Price']
      response.results.standard_cost_nav = navItem['Standard Cost']
    }

    // // Experlogix
    const queryExp = `SELECT * FROM [${process.env.EXP_DATABASE}].dbo.[Experlogix_Items] where [PseudoItemNumber] = '${item_no}'`
    const resExp = await sql.query(queryExp)

    if (resExp.rowsAffected[0] > 0) {
        const expItem = resExp.recordset[0]
        response.msg = 'Results from database'
        response.results.desc_experlogix = expItem.FullDescription
        response.results.exists_experlogix = true
        response.results.list_price_experlogix = expItem.ListPrice
      }
    sql.close()
    return response
  } catch (error) {
    console.error()
    return {
      body: {
        results: []
      }
    }
  }
}

module.exports = { readSqlServer }