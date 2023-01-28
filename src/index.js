import path from 'node:path'
import fs from 'node:fs/promises'

import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'

import App from '../client/App'

const port = 3000
const fastify = Fastify({
  logger: true
})

fastify.register(fastifyStatic, {
  root: path.resolve(process.cwd(), 'public')
})

fastify.get('/', async (_, reply) => {
  try {
    const fileBuffer = await fs.readFile(
      path.resolve(process.cwd(), 'src/index.html')
    )

    const htmlPage = (
      fileBuffer.toString('utf8').replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    )

    return reply.header('Content-Type', 'text/html').send(htmlPage)
  } catch (error) {
    fastify.log.error(error)
    return reply.code(500).send('An error occurred')
  }
})

const start = async () => {
  try {
    await fastify.listen({ port })
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()
