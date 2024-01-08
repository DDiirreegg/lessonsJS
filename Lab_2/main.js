const slider = document.getElementById("slider");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const slideDots = document.querySelectorAll(".slideDot")

let slideIndex = 0;
const images = slider.querySelectorAll("img");

function showImage(index) {
    if(index < 0) {
        slideIndex = images.length - 1;
    }
    else if (index >= images.length) {
        slideIndex = 0;
    }

    images.forEach((images, i) => {
        if(i === slideIndex) {
            images.style.display = "block";
        }
        else{
            images.style.display = "none";
        }
    });

    slideDots.forEach((button, i) => {
        if(i === slideIndex) {
            button.classList.add("active");
        }
        else {
            button.classList.remove("active")
        }
    });    
}

showImage(slideIndex);

prevButton.addEventListener("click", () => {
    slideIndex--;
    showImage(slideIndex);
});

nextButton.addEventListener("click", () => {
    slideIndex++;
    showImage(slideIndex);
});

slideDots.forEach(button => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-index"));
      slideIndex = index;
      showImage(slideIndex);
    });
});
  

// showSlide(slideIndex);
// document.querySelector('.prev').addEventListener('click', () => {
//     slideIndex--;    
//     showSlide(slideIndex);    
// });

// document.querySelector('.next').addEventListener('click', () => {
//     slideIndex++;    
//     showSlide(slideIndex);   
// });
