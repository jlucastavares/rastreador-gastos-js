let listaGastos = [];

carregarDados();

function exibirErro(mensagem) {
    let elementoErro = document.getElementById("msg-erro");
    
    elementoErro.innerText = mensagem;
    
    elementoErro.style.display = "block";
    
    setTimeout(function() {
        elementoErro.style.display = "none";
    }, 3000);
}

function adicionarGasto() {
    let desc = document.getElementById("descricao").value;
    let val = document.getElementById("valor").value;
    
    let elementoErro = document.getElementById("msg-erro");

    if (desc === "" || val === "") {
        exibirErro("⚠️ Por favor, preencha a descrição e o valor!");
        return;
    }

    let valorNumerico = parseFloat(val.replace(",", "."));
    
    if (isNaN(valorNumerico)) {
        exibirErro("⚠️ O valor precisa ser um número válido!");
        return;
    }
    
    elementoErro.style.display = "none";

    let novoGasto = {
        descricao: desc,
        valor: valorNumerico
    };

    listaGastos.push(novoGasto);
    salvarDados();
    renderizarInterface();

    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("descricao").focus(); 
}

function removerGasto(posicao) {

    listaGastos.splice(posicao, 1);
    
    salvarDados();
    renderizarInterface();
}

function renderizarInterface() {
    
    let listaHTML = document.getElementById("lista-gastos");
    let textoTotal = document.getElementById("valor-total");
    
    listaHTML.innerHTML = "";
    
    let total = 0;

    for (let i = 0; i < listaGastos.length; i++) {
        let gasto = listaGastos[i];
        
        let item = document.createElement("li");
        
        item.innerHTML = `
            <span>${gasto.descricao}</span> 
            <strong>R$ ${gasto.valor.toFixed(2)}</strong>
            <button onclick="removerGasto(${i})" style="background: red; width: 30px; margin-left: 10px;">X</button>
        `;
        
        listaHTML.appendChild(item);
        
        total += gasto.valor;
    }

    textoTotal.innerText = `Total: R$ ${total.toFixed(2)}`;
}


function salvarDados() {
    let json = JSON.stringify(listaGastos);
    localStorage.setItem("meusGastos", json);
}

function carregarDados() {

    let dadosSalvos = localStorage.getItem("meusGastos");
    
    if (dadosSalvos) {
        listaGastos = JSON.parse(dadosSalvos);
        renderizarInterface();
    }
}