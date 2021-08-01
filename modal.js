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
window.addEventListener("click", clickOutside);

//Function to open modal
function openModal() {
  console.log("test");
  modal.style.display = "block";
}
//Function to close modal
function closeModal() {
  console.log("close");
  modal.style.display = "none";
}
//Function if a click is happening outside of the modal
function clickOutside(e) {
  console.log("outside");
  if (e.target == modal) {
    modal.style.display = "none";
  }
}
