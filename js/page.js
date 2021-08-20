let bool;
camisetas = [];
const connect = "http://192.168.0.114:8080/api";


function create(model){
    let endpoint = connect + "/Camiseta";
    let request = new XMLHttpRequest();
    request.open('POST', endpoint);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(model));
    request.onload = function(){
        console.log(request.status);
    }
}
function Cadastrar(){
    let marca = document.getElementById("marca").value;
    let cor = document.getElementById("cor").value;
    let model = {"marca":marca, "cor":cor};
    create(model);
}

function carregaLista(){
    let endpoint = connect + "/Camiseta"
    let onde = document.getElementById("lista")
    let listaB = '';
    onde.innerHTML = listaB;
    let request = new XMLHttpRequest();
    request.open('GET', endpoint);
    request.send();
    request.onload = function (){
        let camisetas = JSON.parse(this.responseText);
        camisetas.forEach(e => {
            let listaB = `<tr> <td class="id">${e.id}</td> <td class="nome">${e.marca}</td> <td class="descricao">${e.cor}</td> <td class="opcoes"> <a class="editar" onclick="Editar()"">Editar</a> | <a class="excluir" onclick="Deletar(${e.id})">Excluir</a> </td> </tr>`;
            onde.innerHTML += listaB;
        });
    }
}
function Deletar(id){
    let endpoint = connect + "/Camiseta";
    let request = new XMLHttpRequest();
    request.open('DELETE', endpoint+'/'+id);
    request.send();
    request.onload = function(){
        console.log(request.status);
        window.location = 'listaCategoria.html'
    }
}

function limpaCampos(){
    document.getElementById("nome").value = '';
    document.getElementById("estilo").value = '';
      document.getElementById("description").value = '';
}