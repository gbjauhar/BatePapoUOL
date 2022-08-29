let messages;
const user = {
    name: ''
}

function logIn(){
    const username = prompt("Qual seu nome?");
    user.name = username;
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", user);
    promise.then(updateChat);
    promise.catch(error);
    setInterval(userOnline, 5000)
    setInterval(updateChat, 3000)
}

function userOnline() {
    const userOnline = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', user);
}

function error(promise){
    if(promise.data.status === 400){
        alert("Este nome já está em uso, tente novamente");
        window.location.reload();
    }
}
function updateChat(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(processPromise);
}
updateChat();

function processPromise(promise){
    console.log(promise);
    console.log(promise.data);
    messages = promise.data;
    renderizar();
}

function renderizar(){
    const containerMessage = document.querySelector(".containerMessage");
    containerMessage.innerHTML = '';
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].type === "status") {
            containerMessage.innerHTML += `
            <div class="messagecontent status">
                <span class="time">(${messages[i].time})</span>
                <span class="message-from">${messages[i].from}</span>
                <span class="message-text">${messages[i].text}</span>
            </div>
            `
        }
        if (messages[i].type === "message") {
            containerMessage.innerHTML += `
            <div class="messagecontent message">
                <span class="time">(${messages[i].time})</span>
                <span class="message-from">${messages[i].from}</span>
                <span>para</span>
                <span class="message-to">${messages[i].to}</span>
                <span class="message-text">:${messages[i].text}</span>
            </div>
            `
        }
        if (messages[i].type === "private_message") {
            containerMessage.innerHTML += `
            <div class="messagecontent private-message">
                <span class="time">(${messages[i].time})</span>
                <span class="message-from">${messages[i].from}</span>
                <span>para</span>
                <span class="message-to">${messages[i].to}</span>
                <span class="message-text">:${messages[i].text}</span>
            </div>
            `
        }
    }
    containerMessage.lastElementChild.scrollIntoView();
}
 
let username;

function sendMessage(){
    const typedMessage = document.querySelector(".bottom input");
    const bodyMessage = {
        from: user.name,
        to: "Todos",
        text: typedMessage.value,
        type: "message"
    };

    const promiseMessage = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", bodyMessage);
    promiseMessage.then(updateChat);
    promiseMessage.catch(messageError);
    typedMessage.value = "";
    console.log(bodyMessage);
}

function messageError(error){
    alert("Algo deu errado");
    window.location.reload();
}
