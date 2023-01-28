import path from 'node:path'
import fs from 'node:fs'

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

app.get('/', (_, res) => {
  fs.readFile(path.resolve("./dist/index.html"), "utf8", (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send("An error occurred")
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    )
  })
})

app.listen(port, () => {
  console.log(`react-ssr-template app listening on port ${port}`)
})
