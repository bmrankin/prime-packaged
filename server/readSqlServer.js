const sql = require('mssql')

const sqlConfig = {
  domain: process.env.WIN_DOMAIN,
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

async function getItem (payload) {
  const {
    item_no
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
    const queryNav = `SELECT * FROM [${process.env.NAV_DATABASE}].dbo.[${process.env.NAV_ITEM_TABLE}] where [No_] = '${item_no}'`
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
    const queryExp = `SELECT * FROM [${process.env.EXP_DATABASE}].dbo.[${process.env.EXP_ITEM_TABLE}] where [PseudoItemNumber] = '${item_no}'`
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

async function getOption (payload) {
  const {
    option_key
  } = payload

  const response = {
    msg: 'No results',
    results: {
      exists: false,
      list_price: null,
      no: option_key,
      family: null,
      displayOption: null,
      optionCode: null,
      desc: null,
      feature: null,
      featureDesc: null,
      xor: null,
      requiredXOR: false,
      componentItemNo: null,
      qtyPer: null,
      netAdder: false
    }
  }

  try {
    if (!option_key) throw Error('Option key (PseudoNo) is required')
    await sql.connect(sqlConfig)

    const query = `SELECT * FROM [${process.env.EXP_DATABASE}].dbo.[${process.env.EXP_OPTION_TABLE}] where [PseudoNo] = '${option_key}'`

    const res = await sql.query(query)
    if (res.rowsAffected[0] > 0) {
      response.msg = 'Results from database'
      const option = res.recordset[0]
      response.results.exists = true
      response.results.list_price = +option.List
      response.results.family = option.FAMILY || null
      response.results.displayOption = option.DisplayOption || null
      response.results.optionCode = option.OptionCode || null
      response.results.desc = option.OptionDescription || null
      response.results.feature = option.Feature || null
      response.results.featureDesc = option.FeatureDescription || null
      response.results.xor = option.XOR || null
      response.results.requiredXOR = option.requiredXOR || false
      response.results.componentItemNo = option.ComponentItemPseudoNo || null
      response.results.qtyPer = +option.QTYper || null
      response.results.netAdder = option.NetAdder === 'True' ? true : false
    }

    sql.close()
    return response
  } catch (error) {
    console.error()
    return response
  }
}

module.exports = { getItem, getOption }
