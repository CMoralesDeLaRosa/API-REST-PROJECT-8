const mongoose = require('mongoose')

const videojuegoSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'aventuras',
        'terror',
        'coches',
        'desportes',
        'plataformas',
        'naves',
        'puzzles',
        'simulacion'
      ]
    },
    consoles: [
      { type: mongoose.Types.ObjectId, required: false, ref: 'consolas' }
    ],
    price: { type: Number, required: true },
    verified: { type: Boolean, required: true, default: false }
  },

  { timestamps: true, collection: 'videojuegos' }
)

const Videojuego = mongoose.model(
  'videojuegos',
  videojuegoSchema,
  'videojuegos'
)

module.exports = Videojuego
