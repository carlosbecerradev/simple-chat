io();


/** Sign up */
const formSignUp = document.getElementById('registration');
formSignUp.addEventListener('submit', e => {
    e.preventDefault();
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
