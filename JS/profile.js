// Get Data From LocalStorage
let userAvtar = localStorage.getItem("Image");
let username = localStorage.getItem("username");
let email = localStorage.getItem("email");
let products = JSON.parse(localStorage.getItem("products")) || productsDB;
let myProducts = products.filter((i) => i.isMe == "Y");

// Variablels

let user = document.getElementById("username");
let userEmail = document.getElementById("email");
let userImage = document.getElementById("user-avatar");
let ProductsLength = document.querySelector("#productsLength span");

user.innerHTML = username;
userEmail.innerHTML = email;
userImage.setAttribute("src", userAvtar || "images/avatar.png");
if (myProducts.length != 0) {
  ProductsLength.innerHTML = myProducts.length;
} else {
  ProductsLength.remove();
}
