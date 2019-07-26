const express = require('express')
const mongoose = require('mongoose')
const databaseconfig = require('./config/database')

class Appp {
    constructor() {
        this.express = express()
        this.isDev = process.env.NODE_ENV !== 'production'

        this.database()
        this.middleware()
        this.routes()
    }

    database() {
        mongoose.connect(databaseconfig.uri, {
            useCreateIndex: true,
            useNewUrlParser: true
        })
    }

    middleware() {
        this.express.use(express.json())
    }

    routes() {
        this.express.use(require('./routes'))
    }
}

module.exports = new Appp().express