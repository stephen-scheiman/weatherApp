$(document).ready(function () {
  var storageCount = localStorage.length;

  for (i = 1; i <= storageCount; i++) {
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

        if (count > 10) {
          count = 1;
        }
        localStorage.setItem([count], cityName);

        if (numberCount > 10) {
          $("#priorCities li:first").remove(); // removes first list item which is the oldest
        }
        $("#priorCities").append(
          "<li>" + localStorage.getItem(count) + "</li>"
        );

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
            var locationEl = document.getElementById("location");
            locationEl.innerHTML = "Current Weather Conditions in " + cityName;

            var forecastTemp = data.main.temp;
            var fcastTempEl = document.getElementById("forecastTemp");
            fcastTempEl.innerHTML =
              "Temperature: " + forecastTemp + " degrees Farenheit";

            var forecastHum = data.main.humidity;
            var fcastHumEl = document.getElementById("forecastHum");
            fcastHumEl.innerHTML = "Humidity: " + forecastHum + "%";

            var forecastPres = data.main.pressure;
            var fcastPresEl = document.getElementById("forecastPres");
            fcastPresEl.innerHTML =
              "Barometric Pressure: " + forecastPres + " mb";

            var forecastWind = data.wind.speed;
            var fcastWindEl = document.getElementById("forecastWind");
            fcastWindEl.innerHTML = "Wind Speed: " + forecastWind + " mph";

            var forecastSkies = data.weather[0].main;
            var forecastSkiesIcon = data.weather[0].icon;
            var forecastSkiesIconEl =
              document.getElementById("forecastSkiesIcon");
            var iconsURL =
              "https://openweathermap.org/img/wn/" +
              forecastSkiesIcon +
              "@2x.png";
            forecastSkiesIconEl.setAttribute("src", iconsURL);
            var fcastSkiesEl = document.getElementById("forecastSkies");
            fcastSkiesEl.innerHTML = forecastSkies;
          });
          //This var will hold the five-day forecast URL from lat/lon lookup
        var forecastURL =
          "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&units=imperial&appid=46829ce23a8c173b9cc4d4f2145d78e5";
        fetch(forecastURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            for (i = 0; i <= 39; i++) {
              var forecastTime = dayjs(data.list[i].dt_txt).format("DD");
              var now = dayjs().format("DD");
              //Compare the forecast day to today and find the forecast at noon for the next five days
              if (
                forecastTime - now === 1 &&
                data.list[i].dt_txt.indexOf("12:00:00") === 11 //find the forecast for noon from the 3-hour data stream 
              ) {
                var fiveDayFcastDateOne = dayjs(data.list[i].dt_txt).format(
                  "dd MM/DD/YY"
                );
                var fiveDayFcastTempOne = data.list[i].main.temp;
                var fiveDayFcastHumOne = data.list[i].main.humidity;
                var fiveDayFcastWindOne = data.list[i].wind.speed;
                var fiveDayForecastSkiesIconOne = data.list[i].weather[0].icon;
                var fiveDayIconsURLOne =
                  "https://openweathermap.org/img/wn/" +
                  fiveDayForecastSkiesIconOne +
                  "@2x.png";
                var fiveDayFcastCardOneEl =
                  document.querySelector("#fiveDayCardOne");
                fiveDayFcastCardOneEl.children[1].children[1].innerHTML =
                  "Temp: " +
                  fiveDayFcastTempOne +
                  " deg F" +
                  "\r\n" +
                  "Humidity: " +
                  fiveDayFcastHumOne +
                  "%" +
                  "\r\n" +
                  "Wind Speed " +
                  fiveDayFcastWindOne +
                  " mph";
                fiveDayFcastCardOneEl.children[1].children[0].innerHTML =
                  fiveDayFcastDateOne;
                fiveDayFcastCardOneEl.children[0].setAttribute(
                  "src",
                  fiveDayIconsURLOne
                );
              } else if (
                forecastTime - now === 2 &&
                data.list[i].dt_txt.indexOf("12:00:00") === 11
              ) {
                var fiveDayFcastDateTwo = dayjs(data.list[i].dt_txt).format(
                  "dd MM/DD/YY"
                );
                var fiveDayFcastTempTwo = data.list[i].main.temp;
                var fiveDayFcastHumTwo = data.list[i].main.humidity;
                var fiveDayFcastWindTwo = data.list[i].wind.speed;
                var fiveDayForecastSkiesIconTwo = data.list[i].weather[0].icon;
                var fiveDayIconsURLTwo =
                  "https://openweathermap.org/img/wn/" +
                  fiveDayForecastSkiesIconTwo +
                  "@2x.png";
                var fiveDayFcastCardTwoEl =
                  document.querySelector("#fiveDayCardTwo");
                fiveDayFcastCardTwoEl.children[1].children[1].innerHTML =
                  "Temp: " +
                  fiveDayFcastTempTwo +
                  " deg F" +
                  "\r\n" +
                  "Humidity: " +
                  fiveDayFcastHumTwo +
                  "%" +
                  "\r\n" +
                  "Wind Speed " +
                  fiveDayFcastWindTwo +
                  " mph";
                fiveDayFcastCardTwoEl.children[1].children[0].innerHTML =
                  fiveDayFcastDateTwo;
                fiveDayFcastCardTwoEl.children[0].setAttribute(
                  "src",
                  fiveDayIconsURLTwo
                );
              } else if (
                forecastTime - now === 3 &&
                data.list[i].dt_txt.indexOf("12:00:00") === 11
              ) {
                var fiveDayFcastDateThree = dayjs(data.list[i].dt_txt).format(
                  "dd MM/DD/YY"
                );
                var fiveDayFcastTempThree = data.list[i].main.temp;
                var fiveDayFcastHumThree = data.list[i].main.humidity;
                var fiveDayFcastWindThree = data.list[i].wind.speed;
                var fiveDayForecastSkiesIconThree =
                  data.list[i].weather[0].icon;
                var fiveDayIconsURLThree =
                  "https://openweathermap.org/img/wn/" +
                  fiveDayForecastSkiesIconThree +
                  "@2x.png";
                var fiveDayFcastCardThreeEl =
                  document.querySelector("#fiveDayCardThree");
                fiveDayFcastCardThreeEl.children[1].children[1].innerHTML =
                  "Temp: " +
                  fiveDayFcastTempThree +
                  " deg F" +
                  "\r\n" +
                  "Humidity: " +
                  fiveDayFcastHumThree +
                  "%" +
                  "\r\n" +
                  "Wind Speed " +
                  fiveDayFcastWindThree +
                  " mph";
                fiveDayFcastCardThreeEl.children[1].children[0].innerHTML =
                  fiveDayFcastDateThree;
                fiveDayFcastCardThreeEl.children[0].setAttribute(
                  "src",
                  fiveDayIconsURLThree
                );
              } else if (
                forecastTime - now === 4 &&
                data.list[i].dt_txt.indexOf("12:00:00") === 11
              ) {
                var fiveDayFcastDateFour = dayjs(data.list[i].dt_txt).format(
                  "dd MM/DD/YY"
                );
                var fiveDayFcastTempFour = data.list[i].main.temp;
                var fiveDayFcastHumFour = data.list[i].main.humidity;
                var fiveDayFcastWindFour = data.list[i].wind.speed;
                var fiveDayForecastSkiesIconFour = data.list[i].weather[0].icon;
                var fiveDayIconsURLFour =
                  "https://openweathermap.org/img/wn/" +
                  fiveDayForecastSkiesIconFour +
                  "@2x.png";
                var fiveDayFcastCardFourEl =
                  document.querySelector("#fiveDayCardFour");
                fiveDayFcastCardFourEl.children[1].children[1].innerHTML =
                  "Temp: " +
                  fiveDayFcastTempFour +
                  " deg F" +
                  "\r\n" +
                  "Humidity: " +
                  fiveDayFcastHumFour +
                  "%" +
                  "\r\n" +
                  "Wind Speed " +
                  fiveDayFcastWindFour +
                  " mph";
                fiveDayFcastCardFourEl.children[1].children[0].innerHTML =
                  fiveDayFcastDateFour;
                fiveDayFcastCardFourEl.children[0].setAttribute(
                  "src",
                  fiveDayIconsURLFour
                );
              } else if (
                forecastTime - now === 5 &&
                data.list[i].dt_txt.indexOf("12:00:00") === 11
              ) {
                var fiveDayFcastDateFive = dayjs(data.list[i].dt_txt).format(
                  "dd MM/DD/YY"
                );
                var fiveDayFcastTempFive = data.list[i].main.temp;
                var fiveDayFcastHumFive = data.list[i].main.humidity;
                var fiveDayFcastWindFive = data.list[i].wind.speed;
                var fiveDayForecastSkiesIconFive = data.list[i].weather[0].icon;
                var fiveDayIconsURLFive =
                  "https://openweathermap.org/img/wn/" +
                  fiveDayForecastSkiesIconFive +
                  "@2x.png";
                var fiveDayFcastCardFiveEl =
                  document.querySelector("#fiveDayCardFive");
                fiveDayFcastCardFiveEl.children[1].children[1].innerHTML =
                  "Temp: " +
                  fiveDayFcastTempFive +
                  " deg F" +
                  "\r\n" +
                  "Humidity: " +
                  fiveDayFcastHumFive +
                  "%" +
                  "\r\n" +
                  "Wind Speed " +
                  fiveDayFcastWindFive +
                  " mph";
                fiveDayFcastCardFiveEl.children[1].children[0].innerHTML =
                  fiveDayFcastDateFive;
                fiveDayFcastCardFiveEl.children[0].setAttribute(
                  "src",
                  fiveDayIconsURLFive
                );
              }
            }
          });
      });
  });
});
