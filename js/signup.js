const listaDeUsuarios = [];

function signUp(event) {
    event.preventDefault();
    const form = document.getElementById("signUp");
    if (form.senha.value !== form.repetirSenha.value) {
        alert("Senhas não conferem!");
        form.reset();
        return;
    }
    const listaArmazenada = JSON.parse(localStorage.getItem("listaDeUsuarios"));
    if (listaArmazenada === null) {
        const usuario = {
            usuario: form.nomeUsuario.value,
            senha: form.senha.value,
            mensagens: [],
        };
        listaDeUsuarios.push(usuario);
        localStorage.setItem("listaDeUsuarios", JSON.stringify(listaDeUsuarios));
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "../index.html";
        return;
    }
    const usuarioExiste = listaArmazenada.forEach((usuario) => {
        if (usuario.usuario === form.nomeUsuario.value) {
            return;
        }
    });
    if (!usuarioExiste) {
        const usuario = {
            usuario: form.nomeUsuario.value,
            senha: form.senha.value,
            mensagens: [],
        };
        listaArmazenada.push(usuario);
        localStorage.setItem("listaDeUsuarios", JSON.stringify(listaArmazenada));
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "../index.html";
    } else {
        alert("Usuario já cadastrado!");
    }
    form.reset();
}
