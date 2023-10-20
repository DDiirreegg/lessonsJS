// let offset = 0;
// const sliderLine = document.querySelector('.slider-line');

// document.querySelector('.slider-next').addEventListener('click', function(){
//   offset = offset + 1080;

//   sliderLine.style.left = -offset + 'px';
// })

let slideIndex = 0;

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

showSlide(slideIndex);

document.querySelector('.prev').addEventListener('click', () => {
    slideIndex--;
    showSlide(slideIndex);
});

document.querySelector('.next').addEventListener('click', () => {
    slideIndex++;
    showSlide(slideIndex);
});
