// Get Data From LocalStorage
let userAvtar = localStorage.getItem("Image");
let username = localStorage.getItem("username");
let email = localStorage.getItem("email");

// Variablels
let imageInput = document.getElementById("changeImage");
let userInput = document.getElementById("changeName");
let userEmailInput = document.getElementById("changeEmail");
let editForm = document.getElementById("edit-profile-form");
let userName = document.getElementById("username");
let profileImage;

// Setting Values of Inputs
userInput.value = username;
userEmailInput.value = email;

// Events
editForm.addEventListener("submit", submitFunction);
imageInput.addEventListener("change", uploadImage);

function submitFunction(e) {
  e.preventDefault();

  localStorage.setItem("username", userInput.value);
  localStorage.setItem("email", userEmailInput.value);
  if (imageInput.value != "") {
    localStorage.setItem("Image", profileImage);
  }
  userInput.value = "";
  userEmailInput.value = "";

  setTimeout(() => {
    window.location = "profile.html";
  }, 500);
}

// upload function

function uploadImage() {
  let file = this.files[0];
  let types = ["image/jpeg", "image/png"];
  if (types.indexOf(file.type) == -1) {
    // file.type !== "image/jpeg" || file.type !== "image/png"

    alert("Type not supported");
    return;
  }

  if (file.size > 2 * 1024 * 1024 * 1024) {
    alert("Image not Exced 2MG");
    return;
  }
  //   productImage = URL.createObjectURL(file);
  getImageBase64(file);
}

function getImageBase64(file) {
  let reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = function () {
    profileImage = reader.result;
  };
  reader.onerror = function () {
    alert("Error !!");
  };
}
