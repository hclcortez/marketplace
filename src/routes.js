const express = require('express')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const Adcontroller = require('./app/controllers/Adcontroller')

const authMiddleware = require('./app/middlewares/auth')

const routes = express.Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.get('/ads', Adcontroller.index)
routes.get('/ads/:id', Adcontroller.show)
routes.post('/ads', Adcontroller.store)
routes.put('/ads/:id', Adcontroller.update)
routes.delete('/ads/:id', Adcontroller.destroy)




module.exports = routes