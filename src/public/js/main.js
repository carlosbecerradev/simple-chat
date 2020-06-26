const socket = io();

/** Sign up */
const formSignUp = document.getElementById('signUp');
formSignUp.addEventListener('submit', e => {
    e.preventDefault();
    let formSignUp = document.forms.signUp;
    let formData = new FormData(formSignUp);
    let nickname = formData.get('nickname').toLocaleLowerCase(),
        email = formData.get('email').toLocaleLowerCase(),
        password = formData.get('password').toLocaleLowerCase();
    
    socket.emit('sign up', ({nickname, email, password}), callbackFlag => {
        if(callbackFlag){
            registration.style.display = 'none';
            login.style.display = 'block';
        } else {
            let errosSignUp = document.querySelector('.errosSignUp');
            errosSignUp.innerHTML = `
                <div class="alert alert-danger">
                    Email or Nickname are already created. Try another.
                </div>
            `;
            // formSignUp.reset();     
        }
    });
    console.log(nickname, email, password)
})


/** Sign in */
const formSignIn = document.getElementById('SignIn');
formSignIn.addEventListener('submit', e => {
    e.preventDefault();
    const formSignIn = document.forms.SignIn;
    const formData = new FormData(formSignIn);
    const email = formData.get('email').toLocaleLowerCase(),
        password = formData.get('password').toLocaleLowerCase();
    const errosSignIn = document.querySelector('.errosSignIn');

    socket.emit('sign in', ({ email, password }), callbackFlag => {
        
        if(callbackFlag) {
            if(callbackFlag === 'isSignIn'){
                errosSignIn.innerHTML = `
                    <div class="alert alert-danger">
                        Your account is already connect.
                    </div>
                `;
            } else {
                globalChat.style.display = 'grid';
                login.style.display = 'none';
            }
        } else {
            errosSignIn.innerHTML = `
                <div class="alert alert-danger">
                    Email or password are incorrect.
                </div>
            `;
        }
    });

});

/** Change image */
const changeImage = document.getElementById('changeImage');

/** Update users */
let myUser;
socket.on('user connected', user => {
    myUser = user;
    let userNickname = document.getElementById('userNickname');
    userNickname.innerHTML = user;
});

let usersList = document.getElementById('usersList');
socket.on('update users connected', usersConnected => {
    let html = '';
    usersConnected.splice(usersConnected.indexOf(myUser), 1);
    for(let user of usersConnected){
        html += `
            <div class="chat-user hover-item">
                <div class="chat-user-img">
                    <img src="img/profile3.jpg" alt="">
                </div>
                <div class="chat-user-info">
                    <span class="chat-user-info--name">${user}</span>
                </div>
            </div>
        `;
    }
    console.log(socket.nickanme)
    usersList.innerHTML = html;
});


/** Search user */
const searchUser = document.getElementById('searchUser');
const searchUserInput = document.getElementById('searchUserInput');
searchUserInput.addEventListener('keyup', e => {     
    // console.log(e.target.value)   
    let text = e.target.value.trim();   
    socket.emit('search user', text);
});

socket.on('search user list', nicknames => {
    console.log(nicknames)
    let html = '';
    // nicknames.splice(nicknames.indexOf(myUser), 1);
    for(let user of nicknames){
        html += `
            <div class="chat-user hover-item">
                <div class="chat-user-img">
                    <img src="img/profile3.jpg" alt="">
                </div>
                <div class="chat-user-info">
                    <span class="chat-user-info--name">${user}</span>
                </div>
            </div>
        `;
    }
    usersList.innerHTML = html;
});

searchUser.addEventListener('submit', e => {
    e.preventDefault();
    console.log(searchUserInput.value)
});

/** Send message */
const chatBox = document.getElementById('chatBox');
const sendMessage = document.getElementById('sendMessage');
const sendMessageInput = document.getElementById('sendMessageInput');
sendMessage.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(sendMessageInput.value)
    let inputValue = sendMessageInput.value.trim();
    if(inputValue !== ''){
        socket.emit('send message', inputValue );
        socket.emit('user typing', { nickname: myUser, key: 'Enter', inputEmpty: true });
    }
    sendMessage.reset();
});

// user typing feature
sendMessageInput.addEventListener('keyup', e => {
    let key = e.key, nickname = myUser, inputEmpty = e.target.value === '' ;
    // console.log('emit',nickname, key, inputEmpty)
    socket.emit('user typing', { nickname, key, inputEmpty });
});

socket.on('user typing', ({ nickname, key, inputEmpty }) => {
    // console.log('on',nickname, key, inputEmpty)
    let userTypingDiv = document.getElementById('userTyping');
    if(key === 'Enter' || inputEmpty === true ){
        userTypingDiv.style.display = 'none';
        chatBox.style.paddingTop = '0';
    } else {
        userTypingDiv.innerHTML = 
        `<small>${nickname} are typing now ...</small>`;
        userTypingDiv.style.display = 'block';
        chatBox.style.paddingTop = '2rem';
    }
    
});


/** New message*/
socket.on('new message', ({ message, nickname }) => {
    if(nickname && myUser){
        if(nickname === myUser){
            chatBox.innerHTML += `
            <div class="message emited">
                <div class="message-content">
                    <div class="message-text">
                        <span class="message-text--span">${message}</span>
                    </div>                
                </div>
            </div>
            `;
        } else {
            chatBox.innerHTML += `
            <div class="message received">
                <div class="message-user-nickname" title="${nickname}">
                    <span class="message-user-nickname--span" >${nickname}:</span>
                </div>
                <div class="message-content">
                    <div class="message-text">
                        <span class="message-text--span">${message}</span>
                    </div>
                </div>
            </div>
            `;
        }   
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
});

/** Logout */
const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', e => {
    location.reload();
})