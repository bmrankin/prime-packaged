const { getItem, getOption } = require('./readSqlServer.js')
const { updateItem } = require('./sqlUpdateItem.js')
const { updateOption } = require('./sqlUpdateOption.js')

async function routes (fastify, options) {
  // Test get
  fastify.get('/', async (req, res) => {
    return { hello: 'world' }
  })

  // Test Post
  fastify.post('/test', async (request, reply) => {
    console.log(request.body)
    reply.send({ hello: 'From POST' })
  })

  // Get Item from NAV && Experlogix
  fastify.post('/getItem', async (request, reply) => {
    const resSql = await getItem({
      item_no: request.body.item_no
    })
    console.log(resSql)
    reply.send({
      msg: 'Read SQL route',
      body: {
        ...resSql
      }
    })
  })

  // Get Option from NAV && Experlogix
  fastify.post('/getOption', async (request, reply) => {
    const resSql = await getOption({
      option_key: request.body.option_key
    })
    console.log(resSql)
    reply.send({
      msg: 'Read SQL route',
      body: {
        ...resSql
      }
    })
  })

  // Update Item
  fastify.post('/updateItem', async (request, reply) => {
    const resSql = await updateItem({
      item_no: request.body.item_no || null,
      app: request.body.app,
      list_price: request.body.list_price || null,
      standard_cost: request.body.standard_cost || null,
      update_list_price: request.body.update_list_price || false,
      update_standard_cost: request.body.update_standard_cost || false
    })
    console.log(
      resSql
    )
    reply.send({
      body: resSql
    })
  })

  // Update Option
  fastify.post('/updateOption', async (request, reply) => {
    const resSql = await updateOption({
      key: request.body.key || null,
      list_price: request.body.list_price || null
    })
    console.log(
      resSql
    )
    reply.send({
      body: resSql
    })
  })
}

module.exports = routes
