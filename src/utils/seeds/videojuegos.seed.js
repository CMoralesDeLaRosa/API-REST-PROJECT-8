require('dotenv').config()
const mongoose = require('mongoose')
const Videojuego = require('../../api/models/videojuego')
const videojuegos = require('../../data/videojuegos')

console.log('Ejecutando script de seed de videojuegos')

const dbURL = process.env.DB_URL

mongoose
  .connect(dbURL)
  .then(async () => {
    const allVideojuegos = await Videojuego.find()
    if (allVideojuegos.length) {
      await Videojuego.collection.drop()
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await Videojuego.insertMany(videojuegos)
  })
  .catch((err) => console.log(`Error creating data: ${err}`))

  .finally(() => mongoose.disconnect())

console.log('Seed finalizado')
