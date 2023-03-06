/////////////////////////////////////////////////////////////////////////////////////////////////////

const usuarioAtivo = JSON.parse(localStorage.getItem("usuarioAtivo"));

if (!usuarioAtivo) {
    alert("Não há nenhum usuario conectado!");
    window.location.href = "../index.html";
}

document.getElementById("titulo").textContent = `Bem vindo ${usuarioAtivo.usuario}, aqui estão os seus recados`;
document.getElementById("btn-logout").addEventListener("click", logout);

escreveRecadosArmazenados();

//////////////////////////////////////////////////////////////////////////////////////////////////////

function logout() {
    localStorage.removeItem("usuarioAtivo");
    window.location.href = "../index.html";
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function limpaRecadosDaTela() {
    const listaDeRecadosEscritos = document.querySelectorAll(".indice");
    listaDeRecadosEscritos.forEach((recadoEscrito) => {
        recadoEscrito.parentElement.remove();
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function escreveRecadosArmazenados() {
    usuarioAtivo.mensagens.forEach((recado, index) => {
        const novoRecado = document.createElement("tr");
        const tabela = document.querySelector("tbody");
        const criaIndice = document.createElement("td");
        const criaDescricao = document.createElement("td");
        const criaDetalhe = document.createElement("td");
        const criaBotoes = document.createElement("td");
        const botaoApagar = document.createElement("button");
        const botaoEditar = document.createElement("button");

        criaIndice.setAttribute("class", "indice");
        botaoApagar.setAttribute("class", "apagar");
        botaoEditar.setAttribute("class", "editar");

        criaIndice.textContent = index + 1;
        criaDescricao.textContent = recado.descricao;
        criaDetalhe.textContent = recado.detalhe;
        botaoApagar.textContent = "Apagar";
        botaoEditar.textContent = "Editar";

        novoRecado.appendChild(criaIndice);
        novoRecado.appendChild(criaDescricao);
        novoRecado.appendChild(criaDetalhe);
        novoRecado.appendChild(criaBotoes);
        criaBotoes.appendChild(botaoApagar);
        criaBotoes.appendChild(botaoEditar);

        botaoApagar.addEventListener("click", apagar);
        botaoEditar.addEventListener("click", editar);

        tabela.appendChild(novoRecado);
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function armazenaRecados() {
    const listaArmazenada = JSON.parse(localStorage.getItem("listaDeUsuarios"));
    const indice = listaArmazenada.findIndex((usuario) => usuario.usuario === usuarioAtivo.usuario);
    listaArmazenada.splice(indice, 1, usuarioAtivo);
    localStorage.setItem("usuarioAtivo", JSON.stringify(usuarioAtivo));
    localStorage.setItem("listaDeUsuarios", JSON.stringify(listaArmazenada));
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function limpaEscreveEArmazena() {
    limpaRecadosDaTela();
    escreveRecadosArmazenados();
    armazenaRecados();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function adicionarRecado(event) {
    event.preventDefault();
    const form = document.getElementById("recados");
    const recado = {
        descricao: form.descricao.value,
        detalhe: form.detalhe.value,
    };
    usuarioAtivo.mensagens.push(recado);
    limpaEscreveEArmazena();
    form.reset();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function apagar() {
    const indice = Number(this.parentElement.parentElement.querySelector(".indice").textContent) - 1;
    usuarioAtivo.mensagens.splice(indice, 1);
    limpaEscreveEArmazena();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function editar() {
    const indice = Number(this.parentElement.parentElement.querySelector(".indice").textContent) - 1;
    const editarRecado = usuarioAtivo.mensagens[indice];

    let editarDescricao = confirm("Você deseja editar a descrição deste recado?");
    if (editarDescricao) {
        editarRecado.descricao = prompt("Edite a descrição da mensagem");
    }

    let editardetalhe = confirm("Você deseja editar o detalhe deste recado?");
    if (editardetalhe) {
        editarRecado.detalhe = prompt("Edite a detalhe da mensagem");
    }

    limpaEscreveEArmazena();
}
