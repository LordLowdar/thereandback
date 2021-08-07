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
function getApi() {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${startingPoint.value}&units=imperial&appid=d60338ffc6ff91a104e3347936e9f739`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
//Blocks button from reloading page anc calls functions to occur
submit.addEventListener("click", function (e) {
  e.preventDefault();
  getApi();
  storeCities();
  storeStopsFactor();
  storeBudget();
  storeDates();
  closeModal();
});
