const clockContainer = document.querySelector('.date-js');
const clock = clockContainer.querySelector('h1');

const Time = () =>{
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    clock.innerText = `${year}-${month < 10 ? `0${month + 1}` : month }-${day < 10 ? `0${day}` : day}`;
}

const init =() =>{
    Time();
    setInterval(Time(), 50000);
}

init();