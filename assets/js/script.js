$( document ).ready(function() {
var storageCount = localStorage.length;

for (i=1; i<=storageCount; i++){
  $("#priorCities").append("<li>" + localStorage.getItem(i) + "</li>");
}
var count = storageCount;
var numberCount = storageCount;

//All the action happens when the Search button is clicked
$("#searchButton").on("click", function () {
  // Get the city name from the user
  var cityName = $('input[name="locationField"]').val();
  //Make sure it isn't blank
  if (!cityName) {
    return;
  }
  // This variable will hold the results of the city name to lat/lon conversion
  var geoCodeURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=5&appid=46829ce23a8c173b9cc4d4f2145d78e5";
  //Get the data from the api
  fetch(geoCodeURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //store the returned lat/long
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      //add the city to the prior search list and local storage
      count++;
      numberCount++;

      if(count > 10){
        count = 1;
      } 
      localStorage.setItem([count], cityName);

      if (numberCount > 10){
        $("#priorCities li:first").remove(); // removes first list item which is the oldest
      } 
      $("#priorCities").append("<li>" + localStorage.getItem(count) + "</li>");


      console.log(count);
      $('input[name="locationField"]').val("");
      //This variable will hold the current conditions for the searched city
      var currentConditionsURL =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&units=imperial&appid=46829ce23a8c173b9cc4d4f2145d78e5";
      fetch(currentConditionsURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var locationEl = document.getElementById("location")
          locationEl.innerHTML = "Current Weather Conditions in " + cityName;

          var forecastTemp = data.main.temp;
          var fcastTempEl = document.getElementById("forecastTemp");
          fcastTempEl.innerHTML = "Temperature: " + forecastTemp + " degrees Farenheit";

          var forecastHum = data.main.humidity;
          var fcastHumEl = document.getElementById("forecastHum");
          fcastHumEl.innerHTML = "Humidity: " +forecastHum+ " %";

          var forecastPres = data.main.pressure;
          var fcastPresEl = document.getElementById("forecastPres");
          fcastPresEl.innerHTML = "Barometric Pressure: " +forecastPres+ " mb";

          var forecastWind = data.wind.speed;
          var fcastWindEl = document.getElementById("forecastWind");
          fcastWindEl.innerHTML = "Wind Speed: " +forecastWind+ " mph";

          var forecastSkies = data.weather[0].main;
          var forecastSkiesIcon = data.weather[0].icon;
          var forecastSkiesIconEl = document.getElementById("forecastSkiesIcon");
          var iconsURL = "https://openweathermap.org/img/wn/" +forecastSkiesIcon+ "@2x.png"
          forecastSkiesIconEl.setAttribute("src", iconsURL);
          var fcastSkiesEl = document.getElementById("forecastSkies");
          fcastSkiesEl.innerHTML = forecastSkies;
        });
    });

  // var forecastURL =
  //   'https://api.openweathermap.org/data/2.5/forecast?lat=' +
  //   latitude +
  //   '&lon=' +
  //   longitude +
  //   '&appid=46829ce23a8c173b9cc4d4f2145d78e5';
  // fetch(forecastURL)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     console.log(data);
  //   });
});