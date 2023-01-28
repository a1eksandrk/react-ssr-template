import path from 'node:path'
import fs from 'node:fs/promises'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'

import App from '../client/App'

const port = 3000
const app = express()

app.use(
  express.static(
    path.resolve(process.cwd(), 'public')
  )
)

app.get('/', async (_, res) => {
  try {
    const data = await fs.readFile(
      path.resolve(process.cwd(), 'src/index.html'), 'utf8'
    )

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    )
  } catch (error) {
    console.error(error)
    return res.status(500).send('An error occurred')
  }
})

app.listen(port, () => {
  console.log(`react-ssr-template app listening on port ${port}`)
})
