import express from 'express'
import bodyparser from 'body-parser'
import router from './routes/routes.js'
import database from './db/database.js'

const server = express()

// capturar body
server.use(bodyparser.urlencoded({ extended: false }))
server.use(bodyparser.json())

database.initializate()

// test
server.get('/api/v1', (req, res) => {
  res.status(200).json({ data: 'hola' })
})
server.get('/api/v1/user/data', (req, res) => {
  console.log('hola')
  res.status(200).json({ data: 'hola' })
})

server.use('/api/v1', router)

export default server
