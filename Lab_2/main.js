// let offset = 0;
// const sliderLine = document.querySelector('.slider-line');

// document.querySelector('.slider-next').addEventListener('click', function(){
//   offset = offset + 1080;

//   sliderLine.style.left = -offset + 'px';
// })

let slideIndex = 0;
let dotIndex = 0;

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    if (n < 0) {
        slideIndex = slides.length - 1;
    } else if (n >= slides.length) {
        slideIndex = 0;
    }
    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${slideIndex * 100}%)`;
    });
}

function showDot(p) {
    const dot = document.querySelectorAll('.dot');
    if(p < 0) {
        dotIndex = dot.length - 1;
    } else if (n >= dot.length){
        dotIndex = 0;
    }
    dot.forEach((dot) =>{
        dot.style.backgroundImage = "url('Img/dotOnClick.pngЫ')";
    });
}

showSlide(slideIndex);
showDot(dotIndex);

document.querySelector('.prev').addEventListener('click', () => {
    slideIndex--;
    dotIndex--;
    showSlide(slideIndex);
    showDot(dotIndex);
});

document.querySelector('.next').addEventListener('click', () => {
    slideIndex++;
    dotIndex++;
    showSlide(slideIndex);
    showDot(dotIndex);
});
