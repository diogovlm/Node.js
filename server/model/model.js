const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  Nome: {
    type: String,
    required: true,
  },
  CRM: {
    type: Number,
    require: true,
    unique: true,
  },
  Telefone: {
    type: Number,
    require: true,
    unique: true,
  },
  Celular: {
    type: Number,
    require: true,
    unique: true,
  },
  CEP: {
    type: Number,
    require: true,
  },
  Especialidades: {
    type: String,
    require: false,
  },
});

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;
