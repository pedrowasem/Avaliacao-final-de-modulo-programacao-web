function login(event) {
    event.preventDefault();
    const form = document.getElementById("login");
    const listaArmazenada = JSON.parse(localStorage.getItem("listaDeUsuarios") ?? "[]");
    if (listaArmazenada.length === 0) {
        alert("Nenhum usuário cadastrado, por favor, crie uma conta clicando em Criar uma conta");
        form.reset();
        return;
    }

    const usuarioCadastrado = listaArmazenada.find((usuario) => usuario.username === form.username.value && usuario.senha === form.senha.value);
    if (!usuarioCadastrado) {
        alert("Usuário ou senha incorretos");
        form.reset();
        return;
    }

    localStorage.setItem("usuarioAtivo", JSON.stringify(usuarioCadastrado));
    window.location.href = "lembretes.html";
}
