// Função para carregar todos os agendamentos
async function carregarAgendamentos() {
  try {
    const res = await fetch('/agendamentos'); // Rota que retorna lista de agendamentos
    if (!res.ok) throw new Error('Erro ao carregar agendamentos');
    const agendamentos = await res.json();

    const tbody = document.querySelector('#tabela-agendamentos tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de preencher

    agendamentos.forEach(agendamento => {
      const tr = document.createElement('tr');

      const dataFormatada = new Date(agendamento.data).toLocaleDateString('pt-BR');
      const horaFormatada = new Date(agendamento.data).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });

      tr.innerHTML = `
        <td>${agendamento._id}</td>
        <td>${agendamento.clienteId?.nome || 'Cliente removido'}</td>
        <td>${dataFormatada}</td>
        <td>${horaFormatada}</td>
        <td>${agendamento.status}</td>
        <td>
          <button onclick="alterarStatus('${agendamento._id}', 'confirmado')">Confirmar</button>
          <button onclick="alterarStatus('${agendamento._id}', 'cancelado')">Cancelar</button>
          <button onclick="deletarAgendamento('${agendamento._id}')">Excluir</button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  } catch (error) {
    alert(error.message);
  }
}

// Função para alterar o status do agendamento
async function alterarStatus(id, novoStatus) {
  try {
    const res = await fetch(`/agendamentos/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: novoStatus })
    });
    if (!res.ok) throw new Error('Erro ao alterar status');
    await carregarAgendamentos(); // Atualiza a tabela
  } catch (error) {
    alert(error.message);
  }
}

// Função para deletar um agendamento
async function deletarAgendamento(id) {
  if (!confirm('Deseja realmente excluir este agendamento?')) return;

  try {
    const res = await fetch(`/agendamentos/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Erro ao excluir agendamento');
    await carregarAgendamentos(); // Atualiza a tabela
  } catch (error) {
    alert(error.message);
  }
}

// Carrega os agendamentos assim que a página abre
window.onload = carregarAgendamentos;
