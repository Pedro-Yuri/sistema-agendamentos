// public/js/agendamento.js

async function carregarAgendamentos() {
  try {
    const res = await fetch('/agendamentos');
    if (!res.ok) throw new Error('Erro ao buscar agendamentos');
    const agendamentos = await res.json();

    const tbody = document.getElementById('lista-agendamentos');
    tbody.innerHTML = '';

    agendamentos.forEach(a => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${a._id}</td>
        <td>${a.clienteId?.nome || a.clienteId}</td>
        <td>${new Date(a.data).toLocaleString('pt-BR')}</td>
        <td>${a.descricao}</td>
        <td>${a.status}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    alert(err.message);
  }
}

document.getElementById('form-agendamento').addEventListener('submit', async (e) => {
  e.preventDefault();

  const clienteId = document.getElementById('clienteId').value;
  const data = document.getElementById('data').value;
  const descricao = document.getElementById('descricao').value;

  try {
    const res = await fetch('/agendamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clienteId, data, descricao })
    });

    if (!res.ok) {
      const erro = await res.json();
      throw new Error(erro.mensagem || 'Erro ao criar agendamento');
    }

    alert('Agendamento criado com sucesso!');
    e.target.reset();
    carregarAgendamentos();
  } catch (err) {
    alert(err.message);
  }
});

carregarAgendamentos();
