var searchInput = document.getElementById("search-input");
var btnSearch = document.getElementById("btn-search");
var section1 = document.getElementById("section-1");
var todayForecast = document.querySelector(".today-forecast");
var searchHistory = document.getElementById("search-history");

var weekForecast = document.getElementById("week-forecast");
var burger = document.getElementById("burger");
var sideBar = document.getElementById("side-bar");

function getAPI(searchInputValue) {
  var reqURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    searchInputValue +
    "&units=imperial&appid=28d100a90af18339c0a588b69fc5ad9d";

  // requesting data
  fetch(reqURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data.cod != "200")
        return (weekForecast.innerHTML = "<h1>we don't have any city</h1>");
      if (data)
        // current day icon url
        var icon = `"https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png"`;
      // displaying current day data
      section1.innerHTML = `
        <h1 class="text-2xl  font-bold">${data.city.name} (${
        data["list"][0].dt_txt.split(" ")[0]
      })</h1>
        <div class="mt-4 leading-10 text-3xl">
        <img src=${icon} alt="">
          <p>Temp: ${data.list[0].main.temp} °F</p>
          <p>Wind: ${data.list[0].wind.speed} MPH</p>
          <p>Humidity: ${data.list[0].main.humidity} %</p>
        </div>`;

      weekForecast.innerHTML = "";
      // looping through data to get 5 day 40 requests/8=5
      for (let i = 0; i < data["list"].length; i += 8) {
        // 5 days  icon url
        var icons = `"https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png"`;
        // displaying 5 days forecast
        weekForecast.innerHTML += `<div  class=" cards bg-black text-white w-40 text-center p-4 rounded">
          <h3>${data["list"][i].dt_txt.split(" ")[0]}</h3>
          <img src=${icons} alt="">
          <p>Temp: ${data["list"][i].main.temp}</p>
          <p>Wind: ${data["list"][i].wind.speed} MPH</p>
          <p>Humidity: ${data["list"][i].main.humidity} %</p>
        </div>`;
      }

      return data;
    })
    .catch(err => {
      console.log("err", err);
    });
}

displayHistory();
// displaying history on side bar
function displayHistory(searchInputValue) {
  var storageData = JSON.parse(window.localStorage.getItem("locations")) || [];

  if (searchInputValue != undefined) {
    // checking if already exists
    let exists = storageData.filter(city => city == searchInputValue);

    if (exists.length > 0) return;
    window.localStorage.setItem(
      "locations",
      JSON.stringify([searchInputValue, ...storageData])
    );
    storageData = [searchInputValue, ...storageData];
  }

  if (searchInputValue == undefined) {
    getAPI(storageData[0]);
  }

  searchHistory.innerHTML = "";
  // looping through every button to get this city data
  // setTimeout(() => {
  storageData.forEach(city => {
    searchHistory.innerHTML += `<button id="list-items" class="list-items bg-gray-400 w-56 mt-4 h-8 rounded text-center ml-6 text-xl font-serif p-1">${city}</button>`;
  });
  // }, 1000);
}

// var listItems = ;
// setTimeout(() => {
document.querySelectorAll(".list-items").forEach(item => {
  //  displaying data from the list items
  item.addEventListener("click", event => {
    displayHistory(event.target.textContent);
    getAPI(event.target.textContent);
  });
});
// }, 1000);

// searching weather data using city name
btnSearch.addEventListener("click", function () {
  if (searchInput.value == "") return alert("please type a city name");
  getAPI(searchInput.value);
  displayHistory(searchInput.value);
  searchInput.value = "";
});
