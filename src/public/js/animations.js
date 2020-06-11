const navOptionsBtn = document.querySelector('.nav-dropdown--btn');
const navOptionsContent = document.querySelector('.nav-dropdown--list');

navOptionsBtn.addEventListener('click', e => {
    e.preventDefault;
    navOptionsContent.classList.toggle('active')
});