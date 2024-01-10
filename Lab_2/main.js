const list = document.querySelector('.slider .list');
const items = document.querySelectorAll('.slider .list .item');
const dots = document.querySelectorAll('.slider .dots li');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

const SPACE_KEY = 'Space';
const INTERVAL = 5000;

let sliderIndex = 0;
let itemsLength = items.length - 1;
let intervalIndex = 0;
let intervalId;

function handleSpacebar(event) {
    if (event.code === SPACE_KEY) {
        intervalIndex = (intervalIndex === 0) ? 1 : 0;
        if (intervalIndex === 1) {
            clearInterval(intervalId);            
        }        
    }
    sliderOn();
}

document.addEventListener('keydown', handleSpacebar);

function sliderOn() {
    if (intervalIndex == 0){
        intervalId = setInterval(() => {next.click()}, INTERVAL);
    }else if (intervalId === 'setInterval(() => {next.click()}, INTERVAL)' && intervalIndex == 1) {
        clearInterval(intervalId);
    }
    reloadSlider();
}   


next.onclick = function () {
    sliderIndex = (sliderIndex >= itemsLength) ? 0 : sliderIndex + 1;
    reloadSlider();
};

prev.onclick = function () {
    sliderIndex = (sliderIndex <= 0) ? itemsLength : sliderIndex - 1;
    reloadSlider();
};

function reloadSlider() {
    const checkLeft = items[sliderIndex]?.offsetLeft || 0;
    list.style.left = -checkLeft + 'px';

    const activeDot = document.querySelector('.slider .dots li.active');
    if (activeDot) {
        activeDot.classList.remove('active');
    }

    dots[sliderIndex]?.classList.add('active');
}


dots.forEach((li, key) => {
    li.addEventListener('click', function() {
        sliderIndex = key;
        reloadSlider();
    })
})

sliderOn();
