const mongoose = require('mongoose')

const schema = mongoose.Schema({
    nome:{
      type: String,
      required: true,
      unique: true
    },
    foto:{
      type: String,
      required: true,
    }
  })
  module.exports = mongoose.model('Partido', schema)