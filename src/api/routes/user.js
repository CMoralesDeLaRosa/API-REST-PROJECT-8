const { isAuth, isAdmin } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const {
  getUsers,
  register,
  login,
  deleteUser,
  updateUser
} = require('../controllers/user')

const userRoutes = require('express').Router()

userRoutes.get('/', [isAdmin], getUsers)
userRoutes.post('/register', upload('users').single('avatar'), register)
userRoutes.post('/login', login)
userRoutes.delete('/:id', [isAuth], deleteUser)
userRoutes.put('/:id', [isAuth], upload('users').single('avatar'), updateUser)

module.exports = userRoutes
