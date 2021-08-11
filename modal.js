// Get modal element
var modal = document.getElementById("infoModal");
//Get modal open button
var modalBtn = document.getElementById("modalBtn");
//Get close button
var closeBtn = document.getElementById("closeBtn");

//Listen for click to init on modal here
modalBtn.addEventListener("click", openModal);
//Listen for close click
closeBtn.addEventListener("click", closeModal);
//Listen for outside click
// window.addEventListener("click", clickOutside);

//Function to open modal
function openModal() {
  modal.style.display = "block";
}
//Function to close modal
function closeModal() {
  modal.style.display = "none";
}
//Function if a click is happening outside of the modal
// function clickOutside(e) {
//   console.log("outside");
//   if (e.target == modal) {
//     modal.style.display = "none";
//   }

var starting = document.getElementById("submit");
var form = document.getElementById("info");
//Pulls info from starting city input and stores
function storeCities() {
  var startingCity = document.getElementById("startingPoint").value;
  var endingCity = document.getElementById("endingPoint").value;
  localStorage.setItem("startingCity", JSON.stringify(startingCity));
  localStorage.setItem("EndingCity", JSON.stringify(endingCity));
}
//Stores and pulls stops value, later to be associated with how many stops to be shown
function storeStopsFactor() {
  var stopsFactor = document.getElementById("stops").value;
  localStorage.setItem("stopsFactor", JSON.stringify(stopsFactor));
}
function storeBudget() {
  var budget = document.getElementById("budget").value;
  localStorage.setItem("budgetAmount", JSON.stringify(budget.split("$")[1]));
}
function storeDates() {
  console.log("test");
  //Not sure what date type we want so I wrote both
  var startingDate = new Date(document.getElementById("startingDate").value);
  var departingDate = document.getElementById("departingDate").value;
  localStorage.setItem("startDate", JSON.stringify(startingDate));
  localStorage.setItem("departDate", JSON.stringify(departingDate));
}

//Weather request of current values of starting point
function startingPointWeather() {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${startingPoint.value}&units=imperial&appid=d60338ffc6ff91a104e3347936e9f739`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var startName = document.createElement("h4");
      startName.textContent = data.name;
      document.querySelector(".startingPointCity").appendChild(startName);
      var startTemp = document.createElement("p");
      startTemp.textContent = data.main.temp + "°";
      document.querySelector(".startingPointTemp").appendChild(startTemp);
      var startDescription = document.createElement("p");
      startDescription.textContent = data.weather[0].description;
      document
        .querySelector(".startingPointDesc")
        .appendChild(startDescription);
      var startIcon = data.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + startIcon + ".png";
      document.querySelector(".startingIcon").src = iconUrl;
      var startHumidity = document.createElement("p");
      startHumidity.textContent = data.main.humidity + "%";
      document
        .querySelector(".startingPointHumidity")
        .appendChild(startHumidity);
      var startWind = document.createElement("p");
      startWind.textContent = data.wind.speed + "mph";
      document.querySelector(".startingPointWind").appendChild(startWind);
    });
}

function endingPointWeather() {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${endingPoint.value}&units=imperial&appid=d60338ffc6ff91a104e3347936e9f739`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var endName = document.createElement("h4");
      endName.textContent = data.name;
      document.querySelector(".endingPointCity").appendChild(endName);
      var endTemp = document.createElement("p");
      endTemp.textContent = data.main.temp + "°";
      document.querySelector(".endingPointTemp").appendChild(endTemp);
      var endDescription = document.createElement("p");
      endDescription.textContent = data.weather[0].description;
      document.querySelector(".endingPointDesc").appendChild(endDescription);
      var endIcon = data.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + endIcon + ".png";
      document.querySelector(".endingIcon").src = iconUrl;
      var endHumidity = document.createElement("p");
      endHumidity.textContent = data.main.humidity + "%";
      document.querySelector(".endingPointHumidity").appendChild(endHumidity);
      var endWind = document.createElement("p");
      endWind.textContent = data.wind.speed + "mph";
      document.querySelector(".endingPointWind").appendChild(endWind);
    });
}

//Blocks button from reloading page anc calls functions to occur
submit.addEventListener("click", function (e) {
  e.preventDefault();
  startingPointWeather();
  endingPointWeather();
  storeCities();
  storeStopsFactor();
  storeBudget();
  storeDates();
  closeModal();
});
