const navOptionsBtn = document.querySelector('.nav-dropdown--btn');
const navOptionsContent = document.querySelector('.nav-dropdown--list');

navOptionsBtn.addEventListener('click', e => {
    e.preventDefault;
    navOptionsContent.classList.toggle('active')
});

// sections
const login = document.querySelector('.login');
const registration = document.querySelector('.registration');
const globalChat = document.querySelector('.global-chat');

// small links
const smSignUp = document.getElementById('smSignUp');
const smSignIn = document.getElementById('smSignIn');

smSignIn.addEventListener('click', e => {
    registration.style.display = 'none';
    login.style.display = 'block';
});


smSignUp.addEventListener('click', e => {
    login.style.display = 'none';
    registration.style.display = 'block';
});
