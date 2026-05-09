const API_URL = 'http://localhost:3000/usuarios';

const formUsuario = document.getElementById('form-usuario');
const listaUsuarios = document.getElementById('lista-usuarios');
const btnCarregar = document.getElementById('btn-carregar');

formUsuario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const payload = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        senha: document.getElementById('senha').value
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.status === 201) {
            alert('Usuário cadastrado com sucesso!');
            formUsuario.reset();
            carregarUsuarios()
        } else {
            const erroData = await res.json();
            alert(`Erro: ${erroData.mensagem || 'Falha ao cadastrar'}`);
        }
    } catch (erro) {
        console.error('Erro ao enviar formulário:', erro);
        alert('Erro de conexão com o servidor.');
    }
});


async function carregarUsuarios() {
    try {
        const resposta = await fetch(API_URL);
    
        if (!resposta.ok) throw new Error('Erro ao buscar usuários');

        const usuarios = await resposta.json();

        listaUsuarios.innerHTML = '';

        usuarios.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>${user.telefone}</td>
                <td>
                    <button onclick="deletarUsuario(${user.id})">Excluir</button>
                </td>
            `;
            listaUsuarios.appendChild(tr);
        });

    } catch (erro) {
        console.error('Falha na requisição:', erro);
        alert('Não foi possível carregar a lista de usuários.');
    }
}

btnCarregar.addEventListener('click', carregarUsuarios);
window.addEventListener('DOMContentLoaded', carregarUsuarios);