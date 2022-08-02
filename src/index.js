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
  showDate.innerHTML = `${week[day]} ${time}`;
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

function showFarenheit() {
  tempCurrent.innerHTML = "66";
}
let tempCurrent = document.querySelector(".temp-current");

let tempToFarenheit = document.querySelector("#farenheit");
tempToFarenheit.addEventListener("click", showFarenheit);

function showCelsium() {
  tempCurrent.innerHTML = "21";
}

let tempToCelsium = document.querySelector("#celsium");
tempToCelsium.addEventListener("click", showCelsium);

function getLocalWeatherData(position) {
  let getLatitude = position.coords.latitude;
  let getLongitude = position.coords.longitude;
  let apiKey = "53e34144ce5a79b4d018f2e93c25106e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${getLatitude}&lon=${getLongitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayLocalWeatherData);
}
navigator.geolocation.getCurrentPosition(getLocalWeatherData);

function displayLocalWeatherData(response) {
  let currentLocationTemp = Math.round(response.data.main.temp);
  console.log(currentLocationTemp);
  let currentTemp = document.querySelector(".temp-current");
  currentTemp.innerHTML = currentLocationTemp;
  let getCurrentLocation = response.data.name;
  let currentLocation = document.querySelector(".current-city");
  currentLocation.innerHTML = getCurrentLocation;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#winds").innerHTML = response.data.wind.speed;
}

function otherCity(event) {
  event.preventDefault();
  let enterOtherCity = document.querySelector("#inputCity");
  let showOtherCity = document.querySelector(".current-city");
  showOtherCity = enterOtherCity.value;

  let apiKey = "53e34144ce5a79b4d018f2e93c25106e";
  let otherCityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${showOtherCity}&appid=${apiKey}&units=metric`;

  axios.get(otherCityApiUrl).then(showOtherCityData);
}
cityForm.addEventListener("submit", otherCity);

function showOtherCityData(response) {
  let otherCityTemperature = Math.round(response.data.main.temp);
  console.log(otherCityTemperature);
  let displayOtherCityTemperature = document.querySelector(".temp-current");
  displayOtherCityTemperature.innerHTML = otherCityTemperature;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#winds").innerHTML = Math.round(
    response.data.wind.speed
  );
}
