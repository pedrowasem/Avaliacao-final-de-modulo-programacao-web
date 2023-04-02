function signup(event) {
    event.preventDefault();
    const form = document.getElementById("signup");
    if (form.senha.value !== form.confirmaSenha.value) {
        alert("Senhas não conferem");
        return;
    }

    ////

    const listaDeUsuarios = JSON.parse(localStorage.getItem("listaDeUsuarios") ?? "[]");
    const usuarioExiste = listaDeUsuarios.some((usuario) => usuario.username === form.username.value);
    if (usuarioExiste) {
        alert("Usuário já cadastrado");
        return;
    }

    const usuario = {
        nome: form.nome.value,
        username: form.username.value,
        senha: form.senha.value,
        listaDeLembretes: [],
    };

    listaDeUsuarios.push(usuario);
    localStorage.setItem("listaDeUsuarios", JSON.stringify(listaDeUsuarios));
    alert("Usuário cadastrado com sucesso!");
    window.location.href = "index.html";
    form.reset();
}
