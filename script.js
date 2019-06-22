let chat = document.getElementById('chat');

function open_chat() {
    if (chat.classList.contains('open') == false) {

        chat.classList.add('open')
        chat.setAttribute('mode', 'splash');

        setTimeout(() => {
            chat.setAttribute('mode', 'ready');
        }, 500);
    }
}

function close_chat() {
    if (chat.classList.contains('open') == true) {
        chat.setAttribute('mode', 'splash');
        setTimeout(() => {
            chat.setAttribute('mode', 'close');
            chat.classList.remove('open')
        }, 350);
    }
}

function sendMessage() {
    let message = document.getElementById('message-text')
    if ((message.value + '').length != 0) {
        newMessage(message.value, true);
        message.value = '';
    }
}

function newMessage(text = '', isMine = false) {
    let div = document.createElement('div');
    div.innerText = text;
    div.classList.add('message');
    div.style.width = (text.length * 10) + 'px';
    if (isMine == true) {
        let marginLeft = (300 - (text.length * 10));

        if (marginLeft < 20) {
            marginLeft = 30;
        }
        div.style.marginLeft = marginLeft + 'px';
        div.classList.add('me')
    }
    let messages = document.getElementById('chat-message');
    messages.insertBefore(div, messages.children[0]);
}

function onInputBlur(self) {
    if (self.value.length == 0) {
        self.parentElement.classList.remove('focus');
    }
}

function onkey(event) {
    if (event.keyCode == 13) {
        sendMessage();
        setTimeout(() => {
            document.getElementById('message-text').value = '';
        }, 0);
    }
}

document.getElementById('message-text').addEventListener('keydown', onkey);



setTimeout(open_chat, 300);

setTimeout(() => {
    newMessage('سلام چه کمکی میتونم برای شما انجام بدهم؟')
}, 1600)