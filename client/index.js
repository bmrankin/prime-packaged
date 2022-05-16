const fastify = require('fastify')({ logger: true})
const path = require('path')

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public')
})

fastify.get('/', function(request, reply) {
  return reply.sendFile('index.html')
})

const server = () => {
  try {
    fastify.listen(3002, '0.0.0.0')
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

server()
