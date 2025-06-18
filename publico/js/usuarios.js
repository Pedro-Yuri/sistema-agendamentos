// public/js/usuarios.js

document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const role = document.getElementById('role').value;

  try {
    const res = await fetch('/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha, role })
    });

    if (!res.ok) {
      const erro = await res.json();
      throw new Error(erro.mensagem || 'Erro ao cadastrar');
    }

    alert('Usuário cadastrado com sucesso!');
    window.location.href = 'index.html';
  } catch (err) {
    alert(err.message);
  }
});
