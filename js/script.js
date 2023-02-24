const listaDeUsuarios = [];

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

function signUp(event) {
    event.preventDefault();
    const form = document.getElementById("signUp");
    if (form.senha.value === form.repetirSenha.value) {
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
        } else {
            let usuarioExiste = false;
            listaArmazenada.forEach((usuario) => {
                if (usuario.usuario === form.nomeUsuario.value) {
                    usuarioExiste = true;
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
        }
        form.reset();
    } else {
        alert("Senhas não conferem!");
    }
}
