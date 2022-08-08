let currentTime = new Date();

let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let time = `${hours}:${minutes}`;

function currentDay() {
  let day = currentTime.getDay();

  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let showDate = document.querySelector(".current-time");
  showDate.innerHTML = `${week[day]}, ${time}`;
}
currentDay();

function newCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#inputCity");
  let showCity = document.querySelector(".current-city");
  showCity.innerHTML = `${enterCity.value}`;
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", newCity);

let apiKey = "53e34144ce5a79b4d018f2e93c25106e";
let apiBaseUrl = `https://api.openweathermap.org/data/2.5/weather`;

navigator.geolocation.getCurrentPosition(getLocalWeatherData);

function getLocalWeatherData(position) {
  let getLatitude = position.coords.latitude;
  let getLongitude = position.coords.longitude;
  let apiUrl = `${apiBaseUrl}?lat=${getLatitude}&lon=${getLongitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherData);
}

let currentLocationTemp = 0;

function calculateFarenheit(temperatureCelsium) {
  return Math.round((temperatureCelsium * 9) / 5 + 32);
}

function displayIcon(condition) {
  let pic = document.querySelector("#picture");
  if (condition === "clear sky") {
    pic.src = "src/sun.png";
  } else if (condition === "few clouds") {
    pic.src = "src/cloud_sun.png";
  } else if (condition === "thunderstorm") {
    pic.src = "src/storm_sun.png";
  } else if ((condition === "shower rain", "rain")) {
    pic.src = "src/rain.png";
  } else if (condition === "snow") {
    pic.src = "src/snow.png";
  } else {
    pic.src = "src/cloud.png";
  }
}

function displayWeatherData(response) {
  console.log(response);
  currentLocationTemp = Math.round(response.data.main.temp);
  console.log(currentLocationTemp);
  let currentTemp = document.querySelector(".temp-current");
  currentTemp.innerHTML = currentLocationTemp;
  let getCurrentLocation = response.data.name;
  let currentLocation = document.querySelector(".current-city");
  currentLocation.innerHTML = getCurrentLocation;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#winds").innerHTML = Math.round(
    response.data.wind.speed
  );

  let condition = response.data.weather[0].description;
  document.querySelector(".current-weather-condition").innerHTML = condition;

  displayIcon(condition);
}

function showFarenheit() {
  tempCurrent.innerHTML = calculateFarenheit(currentLocationTemp);
}

let tempCurrent = document.querySelector(".temp-current");

let tempToFarenheit = document.querySelector("#farenheit");
tempToFarenheit.addEventListener("click", showFarenheit);

function showCelsium() {
  tempCurrent.innerHTML = currentLocationTemp;
}

let tempToCelsium = document.querySelector("#celsium");
tempToCelsium.addEventListener("click", showCelsium);

function otherCity(event) {
  event.preventDefault();
  let enterOtherCity = document.querySelector("#inputCity");
  let showOtherCity = document.querySelector(".current-city");
  showOtherCity = enterOtherCity.value;

  let otherCityApiUrl = `${apiBaseUrl}?q=${showOtherCity}&appid=${apiKey}&units=metric`;

  axios.get(otherCityApiUrl).then(displayWeatherData);
}
cityForm.addEventListener("submit", otherCity);
