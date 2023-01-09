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

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.innerHTML =
    cityInput.value[0].toUpperCase() + cityInput.value.substring(1);
  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

function showCity2(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.innerHTML =
    cityInput.value[0].toUpperCase() + cityInput.value.substring(1);
  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", showCity2);

function displayWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let tempInCity = document.querySelector("#current-temp");
  tempInCity.innerHTML = temp;
  let max = document.querySelector("#temp-max");
  max.innerHTML = Math.round(response.data.main.temp_max);
  let min = document.querySelector("#temp-min");
  min.innerHTML = Math.round(response.data.main.temp_min);
  let humidity = document.querySelector("#temp-hum");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let feelsLike = document.querySelector("#temp-feels");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
}
function displayWeather2(response) {
  let temp = Math.round(response.data.main.temp);
  let tempInCity = document.querySelector("#current-temp");
  tempInCity.innerHTML = temp;
  let currentCity = document.querySelector("#searched-city");
  currentCity.innerHTML = response.data.name;
  let max = document.querySelector("#temp-max");
  max.innerHTML = Math.round(response.data.main.temp_max);
  let min = document.querySelector("#temp-min");
  min.innerHTML = Math.round(response.data.main.temp_min);
  let humidity = document.querySelector("#temp-hum");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let feelsLike = document.querySelector("#temp-feels");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
}

function getLocation() {
  function retrievePosition(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(displayWeather2);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocation);
