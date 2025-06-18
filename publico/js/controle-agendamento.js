// public/js/controle-agendamentos.js

async function carregarPainel() {
  try {
    const res = await fetch('/agendamentos');
    const lista = await res.json();

    const tabela = document.getElementById('tabela-agendamentos');
    tabela.innerHTML = '';

    lista.forEach(a => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${a._id}</td>
        <td>${a.clienteId?.nome || a.clienteId}</td>
        <td>${new Date(a.data).toLocaleString('pt-BR')}</td>
        <td>${a.descricao}</td>
        <td>${a.status}</td>
        <td>
          <button onclick="alterarStatus('${a._id}', 'Concluído')">Concluir</button>
          <button onclick="alterarStatus('${a._id}', 'Cancelado')">Cancelar</button>
        </td>
      `;
      tabela.appendChild(tr);
    });
  } catch (err) {
    alert('Erro ao carregar agendamentos: ' + err.message);
  }
}

async function alterarStatus(id, novoStatus) {
  try {
    const res = await fetch(`/agendamentos/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: novoStatus })
    });

    if (!res.ok) throw new Error('Erro ao atualizar status');
    carregarPainel();
  } catch (err) {
    alert(err.message);
  }
}

carregarPainel();
