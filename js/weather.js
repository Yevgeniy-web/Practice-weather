/*Обнаружени местоположения*/
var getWeather = function(data) {
  $.getJSON('http://api.openweathermap.org/data/2.5/weather', {
      lat: data.lat,
      lon: data.lon,
      appid: "7c26280d8eaf1f2bede2a729f7537669"
  }, showWeather, 'jsonp');
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    // Show a map centered at latitude / longitude.
  });
};
 
var showWeather = function(data) {
  $(".current-temperature").text (Math.round(data.main.temp - 273) + '°C')
  $(".current-description").text(data.weather[0].description)
  $(".current-city").text(data.name)
  $(".feelslike .details-value").text (Math.round(data.main.feels_like - 273) + '°C')
  $(".pressure .details-value").text (data.main.pressure  + ' мм. рт. ст.')
  $(".humidity .details-value").text (data.main.humidity  + ' %')  
};

$(document).ready(function() {
  {
      $.getJSON('http://ip-api.com/json', getWeather)
  }
})