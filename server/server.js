const fastify = require('fastify')({ logger: true })
require('dotenv').config()

fastify.register(require('@fastify/cors'), {
  origin: '*',
  methods: ['POST', 'GET']
})

fastify.register(require('./sql-query-routes'))

const server = async () => {
  try {
    await fastify.listen(3001, '0.0.0.0')
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

server()
