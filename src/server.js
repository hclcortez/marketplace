class Appp {
    constructor() {
        this.express = express()
        this.isDev = process.env.NODE_ENV !== 'production'

        this.middleware()
        this.routes()
    }

    middleware() {
        this.express.use(express.json())
    }

    routes() {
        this.express.use(require('./routes'))
    }
}

module.exports = new Appp().express