const mongoose = require('mongoose');
const AgendamentosSchema = new mongoose.Schema({
    clienteId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    descricao: String,
    data: Date,
    status: {type: String, enum:['Agendado', 'concluido', 'cancelado'], default: 'Agendado'}
});

module.exports = mongoose.model('Agendamento', AgendamentosSchema);