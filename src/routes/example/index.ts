import { FastifyPluginAsync } from "fastify"
import { EAS } from "@ethereum-attestation-service/eas-sdk";


const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return 'this is an example'
  })

  fastify.get('/Reviews', async function (request, reply) {
    return 'this is an example'
  })

  fastify.post('/Reviews', async function (request, reply) {
    return 'this is an example'
  })
}

export default example;
