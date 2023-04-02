const linkLogout = document.getElementById("link-logout");
const listaDeUsuarios = JSON.parse(localStorage.getItem("listaDeUsuarios") ?? "[]");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const formEntrar = document.getElementById("form");
const formCadastro = document.getElementById("form-cadastro-usuario");
const modalCadastro = new bootstrap.Modal("#modal-cadastro-usuario");
const containerNotificacao = document.getElementById("container-notificacao");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("DOMContentLoaded", () => {
    const usuarioAtivo = JSON.parse(localStorage.getItem("usuarioAtivo") ?? false);
    if (usuarioAtivo) {
        linkLogout.classList.remove("disabled");
        linkLogout.addEventListener("click", () => {
            localStorage.removeItem("usuarioAtivo");
            linkLogout.classList.add("disabled");
        });
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

formEntrar.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (listaDeUsuarios.length === 0) {
        showAlert("danger", "Nenhum usuário cadastrado, por favor, crie uma conta clicando em Cadastrar");
        form.reset();
        return;
    }

    const usuarioCadastrado = listaDeUsuarios.find((usuario) => usuario.username === formEntrar.usuario.value && usuario.senha === form.senha.value);
    if (!usuarioCadastrado) {
        showAlert("danger", "Usuário ou senha incorretos");
        form.reset();
        return;
    }

    localStorage.setItem("usuarioAtivo", JSON.stringify(usuarioCadastrado));
    form.reset();
    window.location.href = "recados.html";
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
formCadastro.addEventListener("submit", (ev) => {
    ev.preventDefault();

    if (!formCadastro.checkValidity()) {
        formCadastro.classList.add("was-validated");
        return;
    }

    if (formCadastro.senha.value !== formCadastro.confirmaSenha.value) {
        showAlert("danger", "Senhas não conferem");
        return;
    }

    const usuarioExiste = listaDeUsuarios.some((usuario) => usuario.username === formCadastro.usuario.value);
    if (usuarioExiste) {
        showAlert("danger", "Usuário já cadastrado");
        return;
    }

    const usuario = {
        nome: formCadastro.nome.value,
        username: formCadastro.usuario.value,
        senha: formCadastro.senha.value,
        listaDeRecados: [],
    };

    listaDeUsuarios.push(usuario);
    localStorage.setItem("listaDeUsuarios", JSON.stringify(listaDeUsuarios));

    formCadastro.reset();
    modalCadastro.hide();
    formCadastro.classList.remove("was-validated");
    showAlert("success", "Usuário cadastrado com sucesso!");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showAlert(modo, mensagem) {
    const toast = document.createElement("div");
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");
    toast.setAttribute("class", "toast align-items-center border-0 show");
    toast.classList.add(`text-bg-${modo}`);

    const content = document.createElement("div");
    content.setAttribute("class", "d-flex");

    const toastBody = document.createElement("div");
    toastBody.setAttribute("class", "toast-body");
    toastBody.innerHTML = `${mensagem}`;

    const butttonDismiss = document.createElement("button");
    butttonDismiss.setAttribute("type", "button");
    butttonDismiss.setAttribute("class", "btn-close btn-close-white me-2 m-auto");
    butttonDismiss.setAttribute("data-bs-dismiss", "toast");
    butttonDismiss.setAttribute("aria-label", "Fechar notificação");

    content.appendChild(toastBody);
    content.appendChild(butttonDismiss);
    toast.appendChild(content);

    containerNotificacao.appendChild(toast);

    setTimeout(() => {
        containerNotificacao.children[0].remove();
    }, 5000);
}
