const { readSqlServer } = require('./readSqlServer.js')
const { updateItem } = require('./sqlUpdateItem')

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

  // Test READ
  fastify.post('/read-sql', async (request, reply) => {
    console.log(request.body)
    const resSql = await readSqlServer({
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

  // Update Item
  fastify.post('/update-item', async (request, reply) => {
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
}

module.exports = routes
