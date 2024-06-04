const { isAuth, isAdmin } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const {
  getVideojuegos,
  postVideojuego,
  updateVideojuego,
  deleteVideojuego,
  getVideojuegosNotVerified,
  getVideojuegosByPrice,
  getVideojuegosByCategory
} = require('../controllers/videojuego')

const videojuegoRoutes = require('express').Router()

videojuegoRoutes.get('/not-verified', [isAdmin], getVideojuegosNotVerified)
videojuegoRoutes.get('/category/:category', getVideojuegosByCategory)
videojuegoRoutes.get('/price/:price', getVideojuegosByPrice)
videojuegoRoutes.get('/', getVideojuegos)

videojuegoRoutes.post(
  '/',
  [isAuth],
  upload('videojuegos').single('img'),
  postVideojuego
)
videojuegoRoutes.put(
  '/:id',
  [isAdmin],
  upload('videojuegos').single('img'),
  updateVideojuego
)
videojuegoRoutes.delete('/:id', [isAdmin], deleteVideojuego)

module.exports = videojuegoRoutes
