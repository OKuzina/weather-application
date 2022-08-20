function showCurrentDay() {
  let currentTime = new Date();

  let day = currentTime.getDay();

  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let time = `${hours}:${minutes}`;

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

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
let unit = [];

function findIcon(condition) {
  if (condition === "clear sky") {
    src = "src/sun.png";
  } else if (condition === "few clouds") {
    src = "src/cloud_sun.png";
  } else if (condition === "thunderstorm") {
    src = "src/storm.png";
  } else if ((condition === "shower rain", "moderate rain", "rain")) {
    src = "src/rain.png";
  } else if (condition === "snow") {
    src = "src/snow.png";
  } else {
    src = "src/cloud.png";
  }
  return src;
}

function displayIcon(condition) {
  let pic = document.querySelector("#picture");
  pic.src = findIcon(condition);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class = "row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let condition = forecastDay.weather[0].description;

      forecastHTML =
        forecastHTML +
        `
            <div class = "col-2">
              <div class = "weather-forecast-date">
              ${formatDay(forecastDay.dt)}
              </div>
              <img src=${findIcon(condition)} class="forecast-icon"></img>
            </br>
            <div class = "weather-forecast-temp">
              <span class = "weather-forecast-temp-day">
              ${Math.round(forecastDay.temp.day)}°
            </span>
            <span class = "weather-forecast-temp-night">
              / ${Math.round(forecastDay.temp.night)}° 
            </span>
            </div>
            </div>
          
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeatherData(response) {
  currentLocationTemp = Math.round(response.data.main.temp);

  document.querySelector(".temp-current").innerHTML = currentLocationTemp;
  document.querySelector(".current-city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#winds").innerHTML = Math.round(
    response.data.wind.speed
  );

  let condition = response.data.weather[0].description;
  document.querySelector(".current-weather-condition").innerHTML = condition;
  displayIcon(condition);

  getForecast(response.data.coord);
}

function getLocalWeatherData(position) {
  let getLatitude = position.coords.latitude;
  let getLongitude = position.coords.longitude;
  let apiUrl = `${apiBaseUrl}?lat=${getLatitude}&lon=${getLongitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherData);
}

function changeCity(event) {
  event.preventDefault();
  let enterOtherCity = document.querySelector("#inputCity");
  let cityName = enterOtherCity.value;

  let otherCityApiUrl = `${apiBaseUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(otherCityApiUrl).then(displayWeatherData);
}

function showCelsium() {
  tempCurrent.innerHTML = currentLocationTemp;
}

showCurrentDay();

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", changeCity);

let currentLocationTemp = 0;

let apiKey = "53e34144ce5a79b4d018f2e93c25106e";
let apiBaseUrl = `https://api.openweathermap.org/data/2.5/weather`;

navigator.geolocation.getCurrentPosition(getLocalWeatherData);

let tempCurrent = document.querySelector(".temp-current");
