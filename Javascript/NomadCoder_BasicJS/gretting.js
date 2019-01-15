const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greetings');

const USER_LS = 'currentUser';
const SHOWING_CN = 'showing';

const handleSubmit = (event) =>{
    event.preventDefault();
}

const askForName = () =>{
    form.classList.add(SHOWING_CN);
    form.addEventListener('submit', handleSubmit);
}

const paintGreeting = (text) => {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`
}

const loadName = () =>{
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        //she is not
        askForName();
    }else{
        //she is
        paintGreeting(currentUser);
    }
}

const init = () =>{

}

init();




//          여기서 local storage 사용함