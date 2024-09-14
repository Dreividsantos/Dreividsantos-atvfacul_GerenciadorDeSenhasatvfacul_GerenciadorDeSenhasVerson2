document.addEventListener('DOMContentLoaded', function() {
    // Carregar senhas salvas
    if (localStorage.getItem('passwords')) {
        document.getElementById('passwordTable').innerHTML = localStorage.getItem('passwords');
    }
});

document.getElementById('passwordForm').onsubmit = function(e) {
    e.preventDefault();
    
    const site = document.getElementById('site').value;
    const password = document.getElementById('password').value;
    const secretKey = 'secret-key';

    // Criptografar a senha
    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
    
    // Adicionar linha à tabela
    const row = `
        <tr>
            <td>${site}</td>
            <td><input type="password" value="${encryptedPassword}" readonly> <button class="show-hide" onclick="togglePassword(this)">Mostrar</button></td>
            <td><button onclick="deleteRow(this)">Excluir</button></td>
        </tr>`;
    
    document.getElementById('passwordTable').innerHTML += row;

    // Atualizar LocalStorage
    localStorage.setItem('passwords', document.getElementById('passwordTable').innerHTML);
    
    // Limpar formulário e fornecer feedback
    this.reset();
    document.getElementById('feedback').textContent = "Senha adicionada com sucesso!";
    setTimeout(() => document.getElementById('feedback').textContent = '', 3000); // Remove mensagem após 3s
};

function togglePassword(button) {
    const input = button.previousElementSibling;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    button.textContent = isPassword ? 'Ocultar' : 'Mostrar';
}

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    
    // Atualizar LocalStorage após exclusão
    localStorage.setItem('passwords', document.getElementById('passwordTable').innerHTML);
}

