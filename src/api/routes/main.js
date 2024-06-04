const consolaRoutes = require('./consola')
const userRoutes = require('./user')
const videojuegoRoutes = require('./videojuego')

const mainRouter = require('express').Router()

mainRouter.use('/videojuegos', videojuegoRoutes)
mainRouter.use('/consolas', consolaRoutes)
mainRouter.use('/users', userRoutes)

module.exports = mainRouter
