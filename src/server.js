require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const validate = require('express-validation')
const Youch = require('youch')
const databaseconfig = require('./config/database')

class Appp {
    constructor() {
        this.express = express()
        this.isDev = process.env.NODE_ENV !== 'production'

        this.database()
        this.middleware()
        this.routes()
        this.exception()
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

    exception() {
        this.express.use(async (err, req, res, next) => {
            if (err instanceof validate.ValidationError) {
                return res.status(err.status).json(err)
            }

            if (process.env.NODE_ENV !== 'production') {
                const youch = new Youch(err)

                return res.json(await youch.toJSON())
            }

            return res.status(err.status || 500).json({ error: 'Internal Server Error' })
        })
    }
}

module.exports = new Appp().express