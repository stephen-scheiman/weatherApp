$("#searchButton").on("click", function () {
  var cityName = $('input[name="locationField"]').val();

  var geoCodeURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=1&appid=46829ce23a8c173b9cc4d4f2145d78e5";

  fetch(geoCodeURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      console.log("Latitude: " + latitude);
      console.log("Longitude: " + longitude);
      $("#priorCities").append(cityName);
      var forecastURL =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=46829ce23a8c173b9cc4d4f2145d78e5";
      fetch(forecastURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });
    });
});
