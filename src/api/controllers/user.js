const { generateSign } = require('../../config/jwt')
const { deleteFile } = require('../../utils/deletefile')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find()
    return res.status(200).json(allUsers)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      avatar: req.body.avatar,
      userName: req.body.userName,
      password: req.body.password,
      rol: 'user'
    })

    const userDuplicated = await User.findOne({ userName: req.body.userName })

    if (userDuplicated) {
      return res.status(400).json('Ese nombre de usuario ya existe')
    }

    if (req.file) {
      newUser.avatar = req.file.path
    }
    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateSign(user._id)
        return res.status(200).json({ user, token })
      } else {
        return res
          .status(400)
          .json('El usuario o la contraseña son incorrectos')
      }
    } else {
      return res.status(400).json('El usuario o la contraseña son incorrectos')
    }
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { id: userIdFromAuth } = req.user
    const newUser = new User(req.body)

    if (id !== userIdFromAuth) {
      return res
        .status(403)
        .json('No estás autorizado para realizar esta acción')
    }

    newUser._id = id

    if (req.file) {
      newUser.avatar = req.file.path
      const oldUser = await User.findById(id)
      deleteFile(oldUser.avatar)
    }
    const updatedUser = await User.findByIdAndUpdate(id, newUser, { new: true })
    return res.status(200).json(updatedUser)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params

    // Verificar si el usuario está autenticado
    if (!req.user) {
      return res.status(401).json('No estás autenticado')
    }

    const userIdFromAuth = req.user.id

    if (id !== userIdFromAuth) {
      return res
        .status(403)
        .json('No estás autorizado para realizar esta acción')
    }

    const userDeleted = await User.findByIdAndDelete(id)
    if (userDeleted && userDeleted.img) {
      deleteFile(userDeleted.img)
    }

    return res.status(200).json({ mensaje: 'Usuario eliminado', userDeleted })
  } catch (error) {
    console.error('Error al eliminar el usuario:', error)
    return res.status(500).json('Error interno del servidor')
  }
}

module.exports = { getUsers, register, login, deleteUser, updateUser }
