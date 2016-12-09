"use strict";

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';
    // var cityName = searchCity.value;
    // if (cityName.trim().length == 0) {
    //     return alert('Please enter a City Name');
    // }
    var cityName = searchCity.value;
    if(cityName.trim().length == 0){
        return alert("Please enter a City Name");
    }
    var http = new XMLHttpRequest();
    var apiKey = '7a2bd453934340953e6d2f6e10bafd1c';
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
    var method = 'GET';

    http.open(method, url);
    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
            var data = JSON.parse(http.responseText);
            var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase(),data.main.temp);
            console.log(weatherData);
             weatherCity.textContent = weatherData.cityName;
             weatherDescription.textContent = weatherData.description;
             weatherTemperature.textContent = weatherData.temperature + " C";
             loadingText.style.display = 'none';
             weatherBox.style.display = 'block';
        } else if (http.readyState === XMLHttpRequest.DONE) {
            alert('Something went wrong!');
        }
    };
    http.send();
}

