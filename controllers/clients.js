const clientRouter = require('express').Router()
const Client = require('../models/client')

clientRouter.get('/', async (request, response) => {
  const clients = await Client
    .find({})

  response.json(clients)
})

clientRouter.get('/:id', async (request, response) => {
  const client = await Client.findById(request.params.id)
  if (client) {
    response.json(client)
  } else {
    response.status(404).end()
  }
})

clientRouter.post('/', async (request, response, next) => {
  const body = request.body

  const client = new Client({
    name: body.name,
    email: body.email,
    enterprice: body.enterprice,
    number: body.number,
    message: body.message
  })

  try {
    const savedClient = await client.save()
    response.json(savedClient)
  } catch (error) {
    next(error)
  }
})

clientRouter.delete('/:id', async (request, response, next) => {
  try {
    const client = await Client.findByIdAndDelete(request.params.id)
    if (client) {
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = clientRouter
