const express = require('express')
const validade = require('express-validation')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const Adcontroller = require('./app/controllers/Adcontroller')
const Purchasecontroller = require('./app/controllers/Purchasecontroller')
const handle = require('express-async-handler')

const authMiddleware = require('./app/middlewares/auth')

const validators = require('./app/validators')

const routes = express.Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.get('/ads', Adcontroller.index)
routes.get('/ads/:id', Adcontroller.show)
routes.post('/ads', validade(validators.Ad), Adcontroller.store)
routes.put('/ads/:id', Adcontroller.update)
routes.delete('/ads/:id', Adcontroller.destroy)

routes.post('/purchase', handle(Purchasecontroller.store))




module.exports = routes