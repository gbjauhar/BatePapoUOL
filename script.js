let username;
const user = {
    name: username
};


function logIn(){
    const username = prompt("Qual seu nome?");
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
                <span>:</span>
                <span class="message-text">${messages[i].text}</span>
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
                <span>:</span>
                <span class="message-text">${messages[i].text}</span>
            </div>
            `
        }
    }
    containerMessage.lastElementChild.scrollIntoView();
}
function processError(promise){
    console.log("Deu errado!");
}

function sendMessage(){
    const typedMessage = document.querySelector(".bottom input");
    if(typedMessage.value !== ""){
        const bodyMessage = {
            from: user.name
        }
    }
    const promiseMessage = ("https://mock-api.driven.com.br/api/v6/uol/messages", bodyMessage);
    promiseMessage.then(updateChat);
    promiseMessage.catch(messageError);
    typedMessage.value = "";
}

function messageError(error){
    window.location.reload();
}
