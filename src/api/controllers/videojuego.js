const { deleteFile } = require('../../utils/deletefile')
const Videojuego = require('../models/videojuego')

const getVideojuegos = async (req, res, next) => {
  try {
    const allVideojuegos = await Videojuego.find({ verified: true }).populate(
      'consoles'
    )
    return res.status(200).json(allVideojuegos)
  } catch (error) {
    return res.status(404).json('Error')
  }
}

const getVideojuegosNotVerified = async (req, res, next) => {
  try {
    const allVideojuegos = await Videojuego.find({ verified: false }).populate(
      'consoles'
    )
    return res.status(200).json(allVideojuegos)
  } catch (error) {
    return res.status(404).json('Error')
  }
}

const getVideojuegosByPrice = async (req, res, next) => {
  try {
    const { price } = req.params
    const videojuegos = await Videojuego.find({ price: { $lte: price } })
    return res.status(200).json(videojuegos)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getVideojuegosByCategory = async (req, res, next) => {
  try {
    const { category } = req.params
    const videojuegos = await Videojuego.find({ category })
    return res.status(200).json(videojuegos)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const postVideojuego = async (req, res, next) => {
  try {
    const newVideojuego = new Videojuego(req.body)

    if (req.file) {
      newVideojuego.img = req.file.path
    }
    if (req.user.rol === 'admin') {
      newVideojuego.verified = true
    } else {
      newVideojuego.verified = false
    }

    const videojuegoSaved = await newVideojuego.save()
    return res.status(201).json(videojuegoSaved)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const updateVideojuego = async (req, res, next) => {
  try {
    const { id } = req.params
    const newVideojuego = new Videojuego(req.body)
    newVideojuego._id = id

    if (req.file) {
      newVideojuego.img = req.file.path
      const oldVideojuego = await Videojuego.findById(id)
      deleteFile(oldVideojuego.img)
    }
    const updatedVideojuego = await Videojuego.findByIdAndUpdate(
      id,
      newVideojuego,
      { new: true }
    )
    return res.status(200).json(updatedVideojuego)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const deleteVideojuego = async (req, res, next) => {
  try {
    const { id } = req.params
    const videojuegoDeleted = await Videojuego.findByIdAndDelete(id)
    deleteFile(videojuegoDeleted.img)
    return res.status(200).json(videojuegoDeleted)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

module.exports = {
  getVideojuegos,
  postVideojuego,
  deleteVideojuego,
  updateVideojuego,
  getVideojuegosNotVerified,
  getVideojuegosByPrice,
  getVideojuegosByCategory
}
