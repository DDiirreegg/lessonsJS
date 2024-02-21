const apiKey = "768e0288406389e6e0f9840659813b24";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchInput = document.querySelector(".search-box input");

const searchButton = document.querySelector(".search-box button");

const weatherIcon = document.querySelector(".weather-image i");

const weather = document.querySelector(".weather");

const errorText = document.querySelector(".error");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  
    if (response.status === 404) {
      errorText.style.display = "block";
      weather.style.display = "none";
    } else {
      const data = await response.json();
      console.log(data);
  
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "&#8451";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
  
      if (data.weather[0].main == "Clear") {
        weatherIcon.className = "fa-solid fa-sun";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.className = "fa-solid fa-cloud-rain";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.className = "fa-solid fa-cloud-mist";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.className = "fa-solid fa-cloud-drizzle";
      }
  
      weather.style.display = "block";
      errorText.style.display = "none";  
      
      addCityToLocalStorage(data.name);
    }
  }
  

searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
  searchInput.value = "";
});

searchInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    checkWeather(searchInput.value);
    searchInput.value = "";
  }
});

function addCityToLocalStorage(city) {
    let cities = JSON.parse(localStorage.getItem("cities")) || [];
    if (!cities.includes(city)) {
        cities.unshift(city);
        if (cities.length > 10) {
            cities.pop();
        }
        localStorage.setItem("cities", JSON.stringify(cities));    
        loadCitiesFromLocalStorage();
    }
}

  
  
const citySelect = document.getElementById("citySelect");
  citySelect.addEventListener("change", () => {
    const selectedCity = citySelect.value;
    checkWeather(selectedCity);
  });
function loadCitiesFromLocalStorage() {
    let cities = JSON.parse(localStorage.getItem("cities")) || [];
    const citySelect = document.getElementById("citySelect");
    citySelect.innerHTML = ""; 
    cities.forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    loadCitiesFromLocalStorage();
  });

const deleteSelectedCityButton = document.getElementById("deleteSelectedCityButton");

deleteSelectedCityButton.addEventListener("click", () => {    
    const selectedCity = citySelect.value;
    let cities = JSON.parse(localStorage.getItem("cities")) || [];    
    cities = cities.filter(city => city !== selectedCity); 
    localStorage.setItem("cities", JSON.stringify(cities)); 
    loadCitiesFromLocalStorage();
});
citySelect.addEventListener("change", () => {
    const selectedCity = citySelect.value;
    checkWeather(selectedCity);
});


  