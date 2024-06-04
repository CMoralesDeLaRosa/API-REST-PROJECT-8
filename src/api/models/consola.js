const mongoose = require('mongoose')

const consolaSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: Number, required: true }
  },
  { timestamps: true, collection: 'consolas' }
)

const Consola = mongoose.model('consolas', consolaSchema, 'consolas')

module.exports = Consola
