//function that formats the date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = (timestamp = date.getHours());
  let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let day = date.getDate();
  let year = date.getFullYear();
  console.log((date.getMinutes() < 10 ? "0" : "") + date.getMinutes());
  return `${month} ${day}, ${year} @ ${hours}:${minutes}`;
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let day = date.getDate();
  return `${month} ${day}`;
}

//function that displays the 5 day forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="days">
        <div class="forecast-date">${formatForecastDate(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" class="forecast-icon" />
        <div class="forecast-temp">
          <span class="max">${Math.round(
            forecastDay.temp.max
          )}°</span>/<span class="min">${Math.round(
          forecastDay.temp.min
        )}°</span>
        </div>
      </div>
      `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "f6ac59a63eb6c11f9c97a0f9c5fb1033";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

//displays current temperature on the weather app with icon, humidity and wind speed
function displayTemperature(response) {
  let temp = document.querySelector("#temp");
  let city = document.querySelector("#current-city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#weather-icon");

  farenheitTemperature = response.data.main.temp;

  temp.innerHTML = Math.round(farenheitTemperature);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

//makes the search bar work and calls the function that displays the current temp on the app
function searchCity(city) {
  let apiKey = "f6ac59a63eb6c11f9c97a0f9c5fb1033";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

//makes submitting a city work and calls the searchCity function which grabs the weather info from the api

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}

//function makes it so when you click on the link to display the celsius temp, it does the math.

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let celsiusTemperature = ((farenheitTemperature - 32) * 5) / 9;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//brings it back to farenheit

function showFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

//an empty global variable to store within a function.

let farenheitTemperature = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", showFarenheit);

searchCity("Birmingham");
