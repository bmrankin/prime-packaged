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

async function updateItem (payload) {
  console.log({ payload })
  const {
    item_no = null,
    app = null,
    list_price = null,
    standard_cost = null,
    update_list_price = false,
    update_standard_cost = false
  } = payload
  try {
    await sql.connect(sqlConfig)
    const response = {
      msg: 'Nothing updated'
    }

    let query = null

    if (app === 'experlogix') {
      query = `update [${process.env.EXP_DATABASE}].dbo.[Experlogix_Items] set ListPrice = '${list_price}' where PseudoItemNumber = '${item_no}'`
    } else if (app === 'nav') {
      const fieldsToSetArr = []
      if (update_standard_cost) fieldsToSetArr.push(`[Standard Cost] = ${standard_cost}`)
      console.log(fieldsToSetArr)
      if (update_list_price) fieldsToSetArr.push(`[Unit List Price] = ${list_price}`)

      let fieldsToSet = ''
      if (fieldsToSetArr.length > 1) fieldsToSet = fieldsToSetArr.join(', ')
      else fieldsToSet = fieldsToSetArr[0]

      query = `update [${process.env.NAV_DATABASE}].dbo.[DS Master - LIVE$Item] set ${fieldsToSet} where [No_] = '${item_no}'`
    } else {
      sql.close()
      return response
    }

    const res = await sql.query(query)

    if (res.rowsAffected.length < 1) {
      return response
    }
    if (res.rowsAffected[0] > 0) {
      response.msg = `${item_no} updated`
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

module.exports = { updateItem }
