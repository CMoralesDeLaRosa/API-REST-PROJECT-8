const { isAdmin, isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const {
  getConsolas,
  postConsola,
  updateConsola,
  deleteConsola,
  getConsolasbyYear
} = require('../controllers/consola')

const consolaRoutes = require('express').Router()

consolaRoutes.get('/', getConsolas)
consolaRoutes.get('/:year', getConsolasbyYear)

consolaRoutes.post(
  '/',
  [isAdmin],
  upload('consolas').single('img'),
  postConsola
)
consolaRoutes.put(
  '/:id',
  [isAdmin],
  upload('consolas').single('img'),
  updateConsola
)
consolaRoutes.delete('/:id', [isAdmin], deleteConsola)

module.exports = consolaRoutes
