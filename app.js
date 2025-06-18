const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Usuario = require('./modelos/User');
const Agendamento = require('./modelos/Agendamento');

const app = express();
const PORT = process.env.PORT || 3000;


// Conexão MongoDB (escolha local ou .env)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sistema-agendamentos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('📦 Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
  secret: 'segredo123',
  resave: false,
  saveUninitialized: false
}));
// Rotas

// Cadastro
app.post('/usuarios', async (req, res) => {
  const { nome, email, senha, role } = req.body;
  const existe = await Usuario.findOne({ email });
  if (existe) return res.status(400).json({ mensagem: 'Email já cadastrado' });

  const senhaHash = await bcrypt.hash(senha, 10);
  const novoUsuario = new Usuario({ nome, email, senha: senhaHash, role });
  await novoUsuario.save();
  res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
});

// Login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) return res.status(401).json({ mensagem: 'Senha inválida' });

  req.session.usuario = {
    id: usuario._id,
    nome: usuario.nome,
    role: usuario.role
  };

  res.json({ nome: usuario.nome, role: usuario.role });
});

// Middleware de autenticação (opcional)
function auth(req, res, next) {
  if (!req.session.usuario) return res.status(401).json({ mensagem: 'Não autorizado' });
  next();
}

// Criar agendamento
app.post('/agendamentos', auth, async (req, res) => {
  const { clienteId, data, descricao } = req.body;
  const agendamento = new Agendamento({ clienteId, data, descricao });
  await agendamento.save();
  res.status(201).json({ mensagem: 'Agendamento criado' });
});

// Listar agendamentos (admin/cliente)
app.get('/agendamentos', auth, async (req, res) => {
  const user = req.session.usuario;
  let agendamentos;

  if (user.role === 'admin' || user.role === 'atendente') {
    agendamentos = await Agendamento.find().populate('clienteId', 'nome');
  } else {
    agendamentos = await Agendamento.find({ clienteId: user.id }).populate('clienteId', 'nome');
  }

  res.json(agendamentos);
});

// Atualizar status
app.patch('/agendamentos/:id/status', auth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const user = req.session.usuario;
  if (user.role !== 'admin' && user.role !== 'atendente') {
    return res.status(403).json({ mensagem: 'Apenas admin ou atendente pode alterar status' });
  }

  await Agendamento.findByIdAndUpdate(id, { status });
  res.json({ mensagem: 'Status atualizado' });
});

// Sair
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ mensagem: 'Logout efetuado' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
