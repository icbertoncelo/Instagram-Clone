require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const databaseConfig = require('./config/database')

class App {
  constructor () {
    this.express = express()
    this.server = require('http').Server(this.express)
    this.io = require('socket.io')(this.server)

    this.database()
    this.middlewares()
    this.routes()
  }

  database () {
    mongoose.connect(databaseConfig.uri, {
      useNewUrlParser: true,
      useFindAndModify: true
    })
  }

  middlewares () {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'resized'))
    )
    this.express.use((req, res, next) => {
      req.io = this.io

      next()
    })
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().server
