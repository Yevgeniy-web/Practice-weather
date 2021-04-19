
const iconElement = document.querySelector(".forecast-icon");
const tempElement = document.querySelector(".current-temperature");
const descElement = document.querySelector(".current-description");
const locationElement = document.querySelector(".current-city");
const humidityElement = document.querySelector(".humidity .details-value");
const feelslikeElement = document.querySelector(".feelslike .details-value");
const pressureElement = document.querySelector(".pressure .details-value");

const weather = {};

weather.temperature = {
    unit : "celsius"
}
const key = "f49905e51eab8541ab8cd65c2949107e";

// Проверка геолокации браузером
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Браузер не поддерживает геолокацию</p>";
}

function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}
function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}
  function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch (api)
    .then (function(response){
      let data = response.json();
      return data;
    })
    .then(function(data){
            weather.temperature.value = Math.round(data.main.temp - 273);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.feelslike = Math.round(data.main.feels_like - 273);
            weather.pressure = data.main.pressure;
            weather.humidity = data.main.humidity;
    })
    .then(function(){
      displayWeather();
  });
  }

  function displayWeather(){
    iconElement.innerHTML = `<img src="img/icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    feelslikeElement.innerHTML = `${weather.feelslike}°<span>C</span>`;
    pressureElement.innerHTML = `${weather.pressure} мм.рт.ст.`
    humidityElement.innerHTML = `${weather.humidity}%`;
}

tempElement.addEventListener("click", function(){
  if(weather.temperature.value === undefined) return;
  
  if(weather.temperature.unit == "celsius"){
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
      fahrenheit = Math.floor(fahrenheit);
      
      tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
      weather.temperature.unit = "fahrenheit";
  }else{
      tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
      weather.temperature.unit = "celsius"
  }
});