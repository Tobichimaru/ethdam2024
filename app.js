import Fastify from 'fastify';
import multipart from '@fastify/multipart';

export const app = Fastify({
    logger: true
})

app.register(multipart)

app.get('/getReviews', async function (req, reply) {
    return { message: 'Some reviews (hopefully)' }
})

app.post('/createReview', async function (req, reply) {
    return { message: 'Review created' }
})