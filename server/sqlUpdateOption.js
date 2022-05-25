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

async function updateOption (payload) {
  const {
    key = null,
    list_price = null
  } = payload
  const response = {
    success: false,
    msg: 'Nothing updated'
  }
  try {
    await sql.connect(sqlConfig)

    const query = `update [${process.env.EXP_DATABASE}].dbo.[${process.env.EXP_OPTION_TABLE}] set List = '${list_price}' where PseudoNo = '${key}'`

    const res = await sql.query(query)

    if (res.rowsAffected.length < 1) {
      return response
    }
    if (res.rowsAffected[0] > 0) {
      response.success = true
      response.msg = `Option ${key} updated`
    }
    sql.close()
    return response
  } catch (error) {
    console.error()
    return response
  }
}

module.exports = { updateOption }
