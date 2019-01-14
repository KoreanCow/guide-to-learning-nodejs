const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector('h1');

const getTime = () => {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours }:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    // if(seconds < 10) {
    //     clockTitle.innerText = `${hours}:${minutes}:0${seconds}`;
    // }else{
    //     clockTitle.innerText = `${hours}:${minutes}:${seconds}`;
    // }
}

const init = () =>{
    getTime();
    setInterval(getTime, 1000);
}

init();