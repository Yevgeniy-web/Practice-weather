/*Обнаружени местоположения*/
navigator.geolocation.getCurrentPosition(position => {
  console.log(position) 
 })
 
 fetch('https://api.openweathermap.org/data/2.5/group?id=709930,687700,687699&appid=7c26280d8eaf1f2bede2a729f7537669')
 .then(function (resp) {return resp.json() })
 .then(function (data) {
   console.log(data);
   document.querySelector('.current-city').textContent = data.name;
   document.querySelector('.current-description').textContent = data.weather[0]['description'];
   document.querySelector('.current-temperature').textContent = Math.round(data.main.temp - 273) + '°C';
   document.querySelector('.feelslike .details-value').textContent = Math.round(data.main.feels_like - 273) + '°C';
   document.querySelector('.humidity .details-value').textContent = Math.round(data.main.humidity) + '%';
   document.querySelector('.pressure .details-value').textContent = Math.round(data.main.pressure) + ' мм. рт. ст.';
 })
 .catch (function () {
 
 });