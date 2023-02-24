const recados = [];
const usuarioAtivo = JSON.parse(localStorage.getItem("usuarioAtivo"));
const titulo = document.getElementById("titulo");
const btnLogout = document.getElementById("btn-logout");

btnLogout.addEventListener("click", logout);

titulo.textContent = `Bem vindo ${usuarioAtivo.usuario}, aqui estão os seus recados`;

if (usuarioAtivo.mensagens !== null) {
    usuarioAtivo.mensagens.forEach((mensagem) => {
        recados.push(mensagem);
    });
    recuperaRecados();
}

function recuperaRecados() {
    recados.forEach((recado, index) => {
        const novoRecado = document.createElement("tr");
        const tabela = document.querySelector("tbody");
        const criaIndice = document.createElement("td");
        criaIndice.setAttribute("class", "indice");
        const criaDescricao = document.createElement("td");
        const criaDetalhe = document.createElement("td");
        const criaBotao = document.createElement("td");

        const botaoApagar = document.createElement("button");
        botaoApagar.textContent = "Apagar";
        botaoApagar.setAttribute("class", "apagar");
        criaBotao.appendChild(botaoApagar);
        botaoApagar.addEventListener("click", apagar);

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.setAttribute("class", "editar");
        criaBotao.appendChild(botaoEditar);
        botaoEditar.addEventListener("click", editar);

        criaDescricao.textContent = recado.descricao;
        criaDetalhe.textContent = recado.detalhe;

        novoRecado.appendChild(criaIndice);
        novoRecado.appendChild(criaDescricao);
        novoRecado.appendChild(criaDetalhe);
        novoRecado.appendChild(criaBotao);
        tabela.appendChild(novoRecado);
        criaIndice.textContent = index + 1;
    });
}

function armazenaRecados() {
    usuarioAtivo.mensagens = recados;

    const listaArmazenada = JSON.parse(localStorage.getItem("listaDeUsuarios"));
    let indice;
    listaArmazenada.forEach((usuario, index) => {
        if (usuario.usuario === usuarioAtivo.usuario) {
            indice = index;
        }
    });
    listaArmazenada.splice(indice, 1, usuarioAtivo);

    localStorage.setItem("usuarioAtivo", JSON.stringify(usuarioAtivo));
    localStorage.setItem("listaDeUsuarios", JSON.stringify(listaArmazenada));
}

function adicionarRecado(event) {
    event.preventDefault();
    const form = document.getElementById("recados");
    const recado = {
        descricao: form.descricao.value,
        detalhe: form.detalhe.value,
    };
    recados.push(recado);
    const novoRecado = document.createElement("tr");
    const tabela = document.querySelector("tbody");
    const criaIndice = document.createElement("td");
    criaIndice.setAttribute("class", "indice");
    const criaDescricao = document.createElement("td");
    const criaDetalhe = document.createElement("td");
    const criaBotao = document.createElement("td");

    const botaoApagar = document.createElement("button");
    botaoApagar.textContent = "Apagar";
    botaoApagar.setAttribute("class", "apagar");
    criaBotao.appendChild(botaoApagar);
    botaoApagar.addEventListener("click", apagar);

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.setAttribute("class", "editar");
    criaBotao.appendChild(botaoEditar);
    botaoEditar.addEventListener("click", editar);

    criaDescricao.textContent = recado.descricao;
    criaDetalhe.textContent = recado.detalhe;

    novoRecado.appendChild(criaIndice);
    novoRecado.appendChild(criaDescricao);
    novoRecado.appendChild(criaDetalhe);
    novoRecado.appendChild(criaBotao);
    tabela.appendChild(novoRecado);
    criaIndice.textContent = recados.length;
    form.reset();

    armazenaRecados();
}

function logout() {
    localStorage.removeItem("usuarioAtivo");
    window.location.href = "../index.html";
}

function limpaRecados() {
    const listaDeRecadosEscritos = document.querySelectorAll(".indice");
    listaDeRecadosEscritos.forEach((recadoEscrito) => {
        recadoEscrito.parentElement.remove();
    });
}

function apagar() {
    const indice = Number(this.parentElement.parentElement.querySelector(".indice").textContent) - 1;
    recados.splice(indice, 1);
    limpaRecados();
    recuperaRecados();
    armazenaRecados();
}

function editar() {
    const indice = Number(this.parentElement.parentElement.querySelector(".indice").textContent) - 1;
    const editarRecado = recados[indice];

    let editarDescricao = confirm("Você deseja editar a descrição deste recado?");
    if (editarDescricao) {
        editarRecado.descricao = prompt("Edite a descrição da mensagem");
    }

    let editardetalhe = confirm("Você deseja editar a detalhe deste recado?");
    if (editardetalhe) {
        editarRecado.detalhe = prompt("Edite a detalhe da mensagem");
    }

    limpaRecados();
    recuperaRecados();
    armazenaRecados();
}
