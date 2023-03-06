function login(event) {
    event.preventDefault();
    const form = document.getElementById("login");
    const listaArmazenada = JSON.parse(localStorage.getItem("listaDeUsuarios"));
    if (listaArmazenada === null) {
        alert("Nenhum usuário cadastrado, por favor, crie uma conta clicando em CRIAR CONTA");
    } else {
        let usuarioCadastrado = false;
        listaArmazenada.forEach((usuario) => {
            if (usuario.usuario === form.nomeUsuario.value) {
                if (usuario.senha === form.senha.value) {
                    const usuarioAtivo = JSON.stringify(usuario);
                    localStorage.setItem("usuarioAtivo", usuarioAtivo);
                    window.location.replace("HTML/recados.html");
                } else {
                    alert("Senha incorreta!");
                }
                usuarioCadastrado = true;
            }
        });
        if (!usuarioCadastrado) {
            alert("Usuário não cadastrado!");
        }
    }
}
