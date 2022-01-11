function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = (timestamp = date.getHours());
  let minutes = date.getMinutes();
  let months = [
    "January",
    "Feburary",
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
  return `${month} ${day}, ${year} @ ${hours}:${minutes}`;
}

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  forecast.innerHTML = `<div class="days">
        <strong>Jan 9</strong> <br /><img
          src="#"
          class="forecast-icon"
        /><br /><span class="max">50°</span>/<span class="min">30°</span>
      </div>
      <div class="days">
        <strong>Jan 10</strong> <br /><img
          src="#"
          class="forecast-icon"
        /><br /><span class="max">50°</span>/<span class="min">30°</span>
      </div>
      <div class="days">
        <strong>Jan 11</strong> <br /><img src="#" class="forecast-icon" />
        <br /><span class="max">50°</span>/<span class="min">30°</span>
      </div>
      <div class="days">
        <strong>Jan 12</strong> <br /><img src="#" class="forecast-icon" />
        <br /><span class="max">50°</span>/<span class="min">30°</span>
      </div>
      <div class="days">
        <strong>Jan 13</strong> <br /><img src="#" class="forecast-icon" />
        <br /><span class="max">50°</span>/<span class="min">30°</span>
      </div>`;
}

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
}

function searchCity(city) {
  let apiKey = "f6ac59a63eb6c11f9c97a0f9c5fb1033";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let celsiusTemperature = ((farenheitTemperature - 32) * 5) / 9;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

let farenheitTemperature = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", showFarenheit);

searchCity("Birmingham");
displayForecast();
