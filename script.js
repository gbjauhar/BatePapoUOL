
function iniciar(){
    const nome = prompt("Qual seu nome?");
    let obj = {
        name: nome
    }
}
let obj;
const envio = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", obj);

envio.catch(tratarError);

function tratarError(envios){
    //while(envios.response.status !== 200){
   // const nome = prompt("Qual seu nome?");
//}

    console.log(envios);
}

const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
promise.then(tratarSucesso);
promise.catch(tratarErro)

function tratarSucesso(mensagens){
    console.log(mensagens.data);
}

function tratarErro(mensagens){
    console.log("Deu errado!");
}