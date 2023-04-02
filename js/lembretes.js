/////////////////////////////////////////////////////////////////////////////////////////////////////

const usuarioAtivo = JSON.parse(localStorage.getItem("usuarioAtivo"));

if (!usuarioAtivo) {
    alert("Não há nenhum usuario conectado!");
    window.location.href = "index.html";
}

document.getElementById("titulo").textContent = `Bem vindo ${usuarioAtivo.nome}, aqui estão os seus recados`;
document.getElementById("botaoLogout").addEventListener("click", logout);

escreveRecadosArmazenados();

///////////////////////////////////////////////////////////////////////////////////////////////////////

function logout() {
    localStorage.removeItem("usuarioAtivo");
    window.location.href = "index.html";
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function limpaRecadosDaTela() {
    document.querySelectorAll("span").forEach((recadoEscrito) => {
        recadoEscrito.parentElement.remove();
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function escreveRecadosArmazenados() {
    usuarioAtivo.listaDeLembretes.forEach((lembrete, index) => {
        const novoLembrete = document.createElement("div");
        novoLembrete.className = "lembrete";

        const criaIndice = document.createElement("span");
        criaIndice.textContent = index + 1;
        novoLembrete.appendChild(criaIndice);

        const criaRecado = document.createElement("input");
        criaRecado.type = "text";
        criaRecado.className = "recado";
        criaRecado.readOnly = true;
        criaRecado.value = lembrete.recado;
        novoLembrete.appendChild(criaRecado);

        const criaDescricao = document.createElement("input");
        criaDescricao.type = "text";
        criaDescricao.className = "descricao";
        criaDescricao.readOnly = true;
        criaDescricao.value = lembrete.descricao;
        novoLembrete.appendChild(criaDescricao);

        const criaBotoes = document.createElement("div");
        criaBotoes.className = "botoes";
        novoLembrete.appendChild(criaBotoes);

        const botaoEditar = document.createElement("button");
        botaoEditar.className = "editar";
        botaoEditar.textContent = "Editar";
        criaBotoes.appendChild(botaoEditar);
        botaoEditar.addEventListener("click", editar);

        const botaoApagar = document.createElement("button");
        botaoApagar.className = "apagar";
        botaoApagar.textContent = "Apagar";
        criaBotoes.appendChild(botaoApagar);
        botaoApagar.addEventListener("click", apagar);

        document.querySelector(".listaDeLembretes").appendChild(novoLembrete);
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function armazenaRecados() {
    const listaArmazenada = JSON.parse(localStorage.getItem("listaDeUsuarios"));
    const indice = listaArmazenada.findIndex((usuario) => usuario.username === usuarioAtivo.username);
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
    const form = document.getElementById("form");
    const lembrete = {
        recado: form.recado.value,
        descricao: form.descricao.value,
    };
    usuarioAtivo.listaDeLembretes.push(lembrete);
    limpaEscreveEArmazena();
    form.reset();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function apagar() {
    const indice = Number(this.parentElement.parentElement.querySelector("span").textContent) - 1;
    usuarioAtivo.listaDeLembretes.splice(indice, 1);
    limpaEscreveEArmazena();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function editar() {
    const lembrete = this.parentElement.parentElement;
    if (this.textContent === "Editar") {
        lembrete.querySelectorAll("input").forEach((input) => {
            input.readOnly = false;
        });
        this.textContent = "Salvar";
        return;
    }
    const i = Number(lembrete.querySelector("span").textContent) - 1;

    usuarioAtivo.listaDeLembretes[i].recado = lembrete.querySelector(".recado").value;
    usuarioAtivo.listaDeLembretes[i].descricao = lembrete.querySelector(".descricao").value;

    lembrete.querySelectorAll("input").forEach((input) => {
        input.readOnly = true;
    });

    this.textContent = "Editar";
    armazenaRecados();
}
