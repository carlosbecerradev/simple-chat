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
const formSignIn = document.getElementById('login');
formSignIn.addEventListener('submit', e => {
    e.preventDefault();
});

/** Logout */
const logoutBtn = document.getElementById('logout');

/** Change image */
const changeImage = document.getElementById('changeImage');

/** Search user */
const searchUser = document.getElementById('searchUser');
const searchUserInput = document.getElementById('searchUserInput');
searchUserInput.addEventListener('keyup', e => {           
    
})
searchUser.addEventListener('submit', e => {
    e.preventDefault();
    console.log(searchUserInput.value)
});

/** Send message */
const sendMessage = document.getElementById('sendMessage');
const sendMessageInput = document.getElementById('sendMessageInput');
sendMessage.addEventListener('submit', e => {
    e.preventDefault();
    console.log(sendMessageInput.value)
});
