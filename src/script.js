let now = new Date();
let currentDate = document.querySelector("#current-date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours().toString().padStart(2, "0");
let minute = now.getMinutes().toString().padStart(2, "0");

currentDate.innerHTML = `${day} ${hour}:${minute}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row table-row text-center">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="45"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"> ${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="weather-forecast-temperature-min"> ${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
        </div>
     `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getPicture(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiWiki = `https://en.wikipedia.org/w/api.php?action=query&titles=${cityInput.value}&prop=pageimages&format=json&pithumbsize=200&origin=*`;
  axios.get(apiWiki).then(displayPicture);
  console.log(apiWiki);
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

searchForm.addEventListener("submit", getPicture);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", showCity);

searchButton.addEventListener("click", getPicture);

function displayWeather(response) {
  tempInC.classList.add("active");
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  let temp = Math.round(celsiusTemp);
  let tempInCity = document.querySelector("#current-temp");
  tempInCity.innerHTML = temp;
  let rain = document.querySelector("#precipitation");
  rain.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#temp-hum");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let feelsLike = document.querySelector("#temp-feels");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function displayPicture(response) {
  let newImage = document.querySelector("#city-image");
  let pagesObj = response.data.query.pages;
  let pagesObjProps = Object.getOwnPropertyNames(pagesObj);
  if (pagesObjProps.length >= 1) {
    newImage.src = pagesObj[pagesObjProps[0]].thumbnail.source;
  } else {
    console.log("WTF! I don't understand this Wikipedia response!!!");
  }
}

function getLocation() {
  function retrievePosition(position) {
    tempInC.classList.add("active");
    let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(displayWeather);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function addPin() {
  let newImage = document.querySelector("#city-image");
  newImage.setAttribute("src", "images/location-pin.png");
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocation);

locationButton.addEventListener("click", addPin);

function cToF(event) {
  event.preventDefault();
  tempInF.classList.add("active");
  tempInC.classList.remove("active");
  let fTemp = (celsiusTemp * 9) / 5 + 32;
  let fCurrentTemp = document.querySelector("#current-temp");
  fCurrentTemp.innerHTML = Math.round(fTemp);
}
let tempInF = document.querySelector("#temp-F");
tempInF.addEventListener("click", cToF);

function fToC(event) {
  event.preventDefault();
  tempInC.classList.add("active");
  tempInF.classList.remove("active");
  let cCurrentTemp = document.querySelector("#current-temp");
  cCurrentTemp.innerHTML = Math.round(celsiusTemp);
}
let tempInC = document.querySelector("#temp-C");
tempInC.addEventListener("click", fToC);

let celsiusTemp = null;

window.onload = function searchBarcelona() {
  tempInC.classList.add("active");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=535cacbb3f8a0df0aeb4790235b9541f&&units=metric`;
  axios.get(apiUrl).then(displayWeather);
};
