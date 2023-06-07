const mongoose = require('mongoose')

const schema = mongoose.Schema({ 
    eleitorId:{
      type: String,
      required: true,
    },
    partidoId:{
      type: String,
      required: true,
    },
    candidatoId:{
        type: String,
        required: true,
    }

  })
  module.exports = mongoose.model('Voto', schema)