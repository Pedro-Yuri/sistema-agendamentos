const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  data: { type: Date, required: true },
  descricao: { type: String, required: true },
  status: { type: String, enum: ['Pendente', 'Confirmado', 'Cancelado'], default: 'Pendente' }
});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);
