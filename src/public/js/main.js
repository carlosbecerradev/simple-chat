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
    let formSignIn = document.forms.SignIn;
    let formData = new FormData(formSignIn);
    let email = formData.get('email').toLocaleLowerCase(),
        password = formData.get('password').toLocaleLowerCase();

    socket.emit('sign in', ({ email, password }), callbackFlag => {
        if(callbackFlag) {
            globalChat.style.display = 'grid';
            login.style.display = 'none';
        } else {
            let errosSignIn = document.querySelector('.errosSignIn');
            errosSignIn.innerHTML = `
                <div class="alert alert-danger">
                    Email or password are incorrect.
                </div>
            `;
        }
    });

});

/** Logout */
const logoutBtn = document.getElementById('logout');

/** Change image */
const changeImage = document.getElementById('changeImage');

/** Search user */
const searchUser = document.getElementById('searchUser');
const searchUserInput = document.getElementById('searchUserInput');
searchUserInput.addEventListener('keyup', e => {           
    
});

searchUser.addEventListener('submit', e => {
    e.preventDefault();
    console.log(searchUserInput.value)
});

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


/** Send message */
const chatBox = document.getElementById('chatBox');
const sendMessage = document.getElementById('sendMessage');
const sendMessageInput = document.getElementById('sendMessageInput');
sendMessage.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(sendMessageInput.value)
    socket.emit('send message', sendMessageInput.value);
    sendMessage.reset();
});


/** New message*/
socket.on('new message', ({ message, nickname }) => {
    if(nickname === myUser){
        chatBox.innerHTML += `
        <div class="message emited">
            <!-- <div class="message-user-img">
                    <img src="img/profile5.jpg" alt="" >
                </div> -->
            <div class="message-content">
                <div class="message-text">
                    <span class="message-text--span">${message}</span>
                </div>                
            </div>
            <div class="message-timeago"></div>
        </div>
        `;
    } else {
        chatBox.innerHTML += `
        <div class="message received">
            <div class="message-user-img" title="${nickname}">
                <img src="img/profile4.jpg" alt="">
            </div>
            <div class="message-content">
                <div class="message-text">
                    <span class="message-text--span">${message}</span>
                </div>
            </div>
            <div class="message-timeago"></div>
        </div>
        `;
    }   
});