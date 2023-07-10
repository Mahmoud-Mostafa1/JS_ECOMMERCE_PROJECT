let userInfo = document.querySelector("#user_info");
let userDom = document.querySelector("#user");
let links = document.querySelector("#links");
let logoutBtn = document.querySelector("#logout");

let Username = localStorage.getItem("username");
if (Username) {
  links.remove();
  userInfo.style.display = "flex";
  userDom.innerHTML = Username;
}
logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  setTimeout(() => {
    window.location = "register.html";
  }, 1500);
});
