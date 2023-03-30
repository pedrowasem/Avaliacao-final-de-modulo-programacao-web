const linkLogout = document.getElementById("link-logout");
const formRecado = document.getElementById("form-novo-recado");
const usuarioAtivo = JSON.parse(localStorage.getItem("usuarioAtivo"));

const row = document.getElementById("lista-de-recados");
const containerNotificacao = document.getElementById("container-notificacao");

const modalRecado = new bootstrap.Modal("#modal-recado");
const modalApagar = new bootstrap.Modal("#modal-apagar");
const modalAtualizar = new bootstrap.Modal("#modal-atualizar");

let idAtualizar = -1;

if (!usuarioAtivo) {
    alert("Não há nenhum usuario conectado!");
    window.location.href = "index2.html";
}

document.getElementById("titulo").textContent = `Bem vindo ${usuarioAtivo.nome}`;

document.addEventListener("DOMContentLoaded", () => {
    usuarioAtivo.listaDeRecados.forEach((recado) => adicionaRecado(recado));
});

linkLogout.addEventListener("click", () => {
    localStorage.removeItem("usuarioAtivo");
    window.location.href = "index2.html";
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

formRecado.addEventListener("submit", (ev) => {
    ev.preventDefault();

    // chamar a validação deste formulário
    if (!formRecado.checkValidity()) {
        formRecado.classList.add("was-validated");
        return;
    }

    const recado = {
        id: new Date().getTime(),
        titulo: formRecado.titulo.value,
        descricao: formRecado.descricao.value,
    };

    usuarioAtivo.listaDeRecados.push(recado);

    armazenaRecados();
    formRecado.reset();
    adicionaRecado(recado);
    modalRecado.hide();
    formRecado.classList.remove("was-validated");
    showAlert("success", "Recado salvo com sucesso!");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function adicionaRecado(recado) {
    const { id, titulo, descricao } = recado;

    const col = document.createElement("div");
    col.setAttribute("class", "col-12 col-sm-6 col-lg-4 col-xl-3 mb-4");
    col.setAttribute("id", `id${id}`);

    const card = document.createElement("div");
    card.setAttribute("class", "card bg-light-mode text-dark border-dark border-2");

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.innerHTML = titulo;

    const cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.innerHTML = descricao;

    const botoes = document.createElement("div");
    botoes.setAttribute("class", "d-flex justify-content-end");

    const buttonEdit = document.createElement("button");
    buttonEdit.setAttribute("class", "btn bg-light-mode border border-dark border-2 text-dark m-1 me-3");
    buttonEdit.addEventListener("click", () => {
        modalAtualizar.show();
        atualizaTitulo.value = titulo;
        atualizaDescricao.value = descricao;
        idAtualizar = id;
    });
    buttonEdit.innerHTML = `<i class="bi bi-pencil-square"></i>`;

    const buttonDelete = document.createElement("button");
    buttonDelete.setAttribute("class", "btn bg-light-mode border border-dark border-2 text-dark m-1 me-4");
    buttonDelete.addEventListener("click", () => {
        modalApagar.show();
        const confirmar = document.getElementById("confirmar-exclusao");
        confirmar.setAttribute("onclick", `apagar(${id})`);
    });
    buttonDelete.innerHTML = `<i class="bi bi-trash3"></i>`;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(botoes);
    botoes.appendChild(buttonEdit);
    botoes.appendChild(buttonDelete);

    card.appendChild(cardBody);
    col.appendChild(card);

    row.appendChild(col);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function armazenaRecados() {
    const listaArmazenada = JSON.parse(localStorage.getItem("listaDeUsuarios"));
    const indice = listaArmazenada.findIndex((usuario) => usuario.username === usuarioAtivo.username);
    listaArmazenada.splice(indice, 1, usuarioAtivo);
    localStorage.setItem("usuarioAtivo", JSON.stringify(usuarioAtivo));
    localStorage.setItem("listaDeUsuarios", JSON.stringify(listaArmazenada));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// formAtualizar.addEventListener("submit", (ev) => {
//     ev.preventDefault();

//     // chamar a validação deste formulário
//     if (!formAtualizar.checkValidity()) {
//         formAtualizar.classList.add("was-validated");
//         return;
//     }

//     // some => desconsiderar o id que esta sendo atualizado
//     const exist = listaContatos.some((contato) => {
//         if (contato.id === idAtualizar) {
//             return false;
//         }

//         return contato.phone === phoneUpdate.value;
//     });

//     if (exist) {
//         modalAtualizar.hide();
//         showAlert("danger", "Esse número já esta salvo como outro contato!");
//         return;
//     }

//     // ATUALIZAR A LISTA LOCAL
//     const indiceUpdate = listaContatos.findIndex((contato) => contato.id === idAtualizar);
//     listaContatos[indiceUpdate].name = nameUpdate.value;
//     listaContatos[indiceUpdate].phone = phoneUpdate.value;

//     // ATUALIZAR O LOCASTORAGE
//     localStorage.setItem("contacts", JSON.stringify(listaContatos));

//     // ATUALIZAR O ELEMENTO NA DOM
//     const cardTitle = document.querySelector(`#contato-${idAtualizar} .card-title`);
//     cardTitle.innerHTML = nameUpdate.value;

//     const cardText = document.querySelector(`#contato-${idAtualizar} .card-text`);
//     cardText.innerHTML = phoneUpdate.value;

//     modalAtualizar.hide();
//     showAlert("success", "Contato atualizado com sucesso! 👌");
//     idAtualizar = -1;
//     formAtualizar.classList.remove("was-validated");
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function apagar(idRecado) {
    // EXCLUIR DA LISTA DE CONTATOS LOCAL
    const indice = usuarioAtivo.listaDeRecados.findIndex((recado) => recado.id === idRecado);
    usuarioAtivo.listaDeRecados.splice(indice, 1);

    // ATUALIZAR O LOCALSTORAGE
    localStorage.setItem("usuarioAtivo", JSON.stringify(usuarioAtivo.listaDeRecados));
    armazenaRecados();

    // EXCLUIR O COL DA DOM
    const col = document.getElementById(`id${idRecado}`);
    col.classList.add("apagado");
    setTimeout(() => {
        col.remove();
    }, 2000);

    modalApagar.hide();
    showAlert("success", "Contato deletado com sucesso! 👌");
}

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
