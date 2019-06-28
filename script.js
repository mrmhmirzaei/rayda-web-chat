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

/**
 * Send Message function
 */
function sendMessage() {
    let message = document.getElementById('message-text')
    if ((message.innerHTML + '').length != 0) {
        newMessage(message.innerHTML, true);
        message.innerText = '';
    }
}


/**
 * This function show the message
 * @param {String} text Message content
 * @param {Boolean} isMine Who send the message
 */
function newMessage(text = '', isMine = false) {
    let div = document.createElement('div');
    div.innerHTML = text;
    div.classList.add('message');
    div.style.width = (text.length * 10) + 'px';
    let width = window.screen.width < 600 ? window.screen.width - 50 : 335;
    if (isMine == true) {
        let marginLeft = (width - (text.length * 10));

        if (marginLeft < 20 && window.screen.width >= 600) {
            marginLeft = 65;
        }
        if (marginLeft < 20 && window.screen.width < 600) {
            marginLeft = 92;
        }
        div.style.marginLeft = marginLeft + 'px';
        div.classList.add('me')
    }
    let messages = document.getElementById('chat-message');
    messages.insertBefore(div, messages.children[0]);
    document.getElementById('emojis').classList.remove('show')
}

function onInputBlur(self) {
    if (document.getElementById('message-text').innerText.length == 0) {
        document.getElementById('message-text').parentElement.classList.remove('focus');
    }
}

function onkey(event) {
    if (event.keyCode == 13) {
        sendMessage();
        setTimeout(() => {
            document.getElementById('message-text').innerText = '';
        }, 0);
    }
}

function loadEmoji() {
    let emojis = document.getElementById('emojis');
    for (let i = 1; i <= 50; i++) {
        let img = document.createElement('img');
        img.src = `./emoji/${i}.svg`;
        img.setAttribute('onclick', `selectEmoji(${i})`);
        emojis.appendChild(img);
    }
}

function selectEmoji(index) {
    document.querySelector('div.footer').classList.add('focus')
    document.getElementById('message-text').innerHTML += `<img src="./emoji/${index}.svg">`
}

/**
 * Load Image
 */
function openImage() {
    let fileElm = document.getElementById('file');
    fileElm.click();
    fileElm.onchange = (event) => {
        let file = event.target.files[0];
        if (!file) {
            return;
        } else {
            var reader = new FileReader();
            reader.onload = function(e) {
                var contents = e.target.result;
                // BASE 64 Image Data      
                // contents is the data :)    
                newMessage(`<img src="${contents}" class="image">`, true)
            }
            reader.readAsDataURL(file)
        }
    }
}

function setColor(rgb = "0,0,0") {
    document.documentElement.style.setProperty('--background-color', rgb);
}

window.onload = () => {
    loadEmoji();
    document.getElementById('message-text').addEventListener('keydown', onkey);
}