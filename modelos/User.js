const mongoose = require('mongoose');
const { type } = require('os');
const UserShema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    role: {type: String, enum:['cliente', 'atendente', 'admin'], default:'cliente'}
});

module.exports = mongoose.model('User', UserSchema);