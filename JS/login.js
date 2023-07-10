let username = document.querySelector("#username");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#sign_in");

let getUser = localStorage.getItem("username");
let getPassword = localStorage.getItem("password");

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (username.value === "" || password.value === "") {
    alert("Please Fill Data");
  } else {
    if (
      //   getUser && getPassword &&
      username.value.trim() === getUser &&
      password.value.trim() === getPassword
    ) {
      setTimeout(() => {
        window.location = "index.html";
      }, 1500);
    } else {
      console.log("username or password is wrong");
    }
  }
});
