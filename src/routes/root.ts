import { FastifyPluginAsync } from 'fastify'
// import { EAS } from "@ethereum-attestation-service/eas-sdk";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.get('/reviews', async function (request, reply) {
    return 'this is an example'
  })

  fastify.post('/reviews', async function (request, reply) {
    return 'this is an example'
  })
}

export default root;
