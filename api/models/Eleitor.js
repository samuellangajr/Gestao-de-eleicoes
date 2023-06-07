const mongoose = require('mongoose')

const schema = mongoose.Schema({
    nome:{
      type: String,
      required: true,
    },
    bi:{
      type: String,
      required: true,
    },

    foto:{
      type: String,
      required: true,
    },
   
  })
  module.exports = mongoose.model('Eleitor', schema)