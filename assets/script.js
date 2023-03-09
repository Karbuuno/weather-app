var searchInput = document.getElementById("search-input");
var btnSearch = document.getElementById("btn-search");
var section1 = document.getElementById("section-1");
var todayForecast = document.querySelector(".today-forecast");
var searchHistory = document.getElementById("search-history");
var listItems = document.querySelector(".list-items");
var weekForecast = document.getElementById("week-forecast");
var burger = document.getElementById("burger");
var sideBar = document.getElementById("side-bar");

// var today = dayjs().format("M-DD-YYYY");

// var searchInputValue = searchInput.value;

function getAPI(searchInputValue) {
  var reqURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    searchInputValue +
    "&appid=50da6ed7b37bc64850231cb706c4a313";
  fetch(reqURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      section1.innerHTML = `
        <h1 class="text-2xl  font-bold">${data.city.name} (${
        data["list"][0].dt_txt.split(" ")[0]
      }) ${data.list[0].weather.icon}</h1>
        <div class="mt-4 leading-10 text-3xl">
          <p>Temp: ${data.list[0].main.temp}</p>
          <p>Wind: ${data.list[0].wind.speed} MPH</p>
          <p>Humidity: ${data.list[0].main.humidity} %</p>
        </div>`;
      searchInputValue = "";
      weekForecast.innerHTML = "";
      for (let i = 0; i < data["list"].length; i += 8) {
        weekForecast.innerHTML += `<div class="bg-black text-white w-40 text-center p-4 rounded">
          <h3>${data["list"][i].dt_txt.split(" ")[0]}</h3>
          <p>🌥️</p>
          <p>Temp: ${data["list"][i].main.temp}</p>
          <p>Wind: ${data["list"][i].wind.speed} MPH</p>
          <p>Humidity: ${data["list"][i].main.humidity} %</p>
        </div>`;
      }

      // window.localStorage.setItem("data", JSON.stringify(storageData));
      return data;
    });
  displayHistory();
}

function displayHistory() {
  var text = searchInput.value;

  searchHistory.innerHTML += `<li class=" bg-gray-400 w-56 mt-4 h-8 rounded text-center text-xl font-serif p-1">${text}</li>`;
}
burger.addEventListener("click", function () {
  // sideBar.
});
btnSearch.addEventListener("click", function () {
  getAPI(searchInput.value);

  var storageData = JSON.parse(window.localStorage.getItem("locations")) || [];

  console.log("storage data", storageData);

  // a.push(JSON.parse(localStorage.getItem('session')));
  console.log(searchInput.value);
  var newData = storageData.push(searchInput.value);
  newData = JSON.stringify(newData);

  window.localStorage.setItem("locations", newData);
});
