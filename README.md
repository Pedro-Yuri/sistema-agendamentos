# 🗓️ Sistema de Agendamentos Web

Sistema web completo para agendamento, gerenciamento e controle de compromissos, com suporte a múltiplos perfis de usuário: **Cliente**, **Atendente** e **Administrador**.  
Desenvolvido com **Node.js**, **Express**, **MongoDB** e **HTML/JavaScript** no frontend.

---

## 🚀 Funcionalidades

- ✅ Cadastro e login de usuários
- ✅ Agendamento de compromissos por clientes
- ✅ Visualização e controle de agendamentos pelos atendentes
- ✅ Gerenciamento completo por administradores
- ✅ Autenticação com sessões
- ✅ Controle de permissões por perfil
- ✅ Interface amigável e responsiva

---

## 🧰 Tecnologias Utilizadas

| Camada       | Tecnologias                 |
|--------------|-----------------------------|
| Backend      | Node.js, Express, MongoDB   |
| Frontend     | HTML5, CSS3, JavaScript     |
| Banco de dados | MongoDB + Mongoose        |
| Sessões      | express-session             |
| Outros       | dotenv, body-parser         |

---

## 🗂️ Estrutura do Projeto

sistema-agendamentos/
├── public/
│ ├── index.html
│ ├── agendamento.html
│ ├── usuarios.html
│ ├── controle-agendamentos.html
│ └── js/
│ ├── agendamento.js
│ ├── usuarios.js
│ └── controle-agendamentos.js
├── app.js
├── .env
├── package.json
└── README.md


---

## ⚙️ Como Executar Localmente

### 1. Clone o repositório

git clone https://github.com/Pedro-Yuri/sistema-agendamentos.git
cd sistema-agendamentos
2. Instale as dependências
npm install
3. Crie o arquivo .env com suas variáveis de ambiente:
env
Copiar
Editar
PORT=3000
MONGO_URI=mongodb://localhost:27017/agendamentos
SESSION_SECRET=sua_chave_secreta
4. Inicie o servidor
bash
Copiar
Editar
node app.js
Acesse no navegador: http://localhost:3000

👥 Perfis de Usuário
Cliente: realiza agendamentos

Atendente: gerencia atendimentos

Administrador: controla usuários, permissões e visualiza todos os agendamentos

🛡️ Segurança
Senhas com hash (em futuras versões)

Sessões autenticadas por express-session

Controle de acesso baseado em níveis de usuário

📌 Status do Projeto
🚧 Em desenvolvimento — novas funcionalidades estão sendo implementadas, como:

Edição e cancelamento de agendamentos

Hash de senha com bcrypt

Upload de arquivos

📄 Licença:

Este projeto é de uso acadêmico e livre para fins de aprendizado.

