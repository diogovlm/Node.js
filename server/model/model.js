const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  Nome: {
    type: String,
  },
  Registro: {
    type: String,
  },
  Telefone: {
    type: String,
  },
  Celular: {
    type: String,
  },
  CEP: {
    type: String,
  },
  Endereco: {
    type: String,
  },
  Bairro: {
    type: String,
  },
  Cidade: {
    type: String,
  },
  UF: {
    type: String,
  },
  Numero: {
    type: String,
  },
  Complemento: {
    type: String,
  },
  Especialidades: {
    type: Array,
  },
});
const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;
