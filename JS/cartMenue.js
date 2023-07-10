let cartProductDivDom = document.querySelector(".cart-products div");
let cartProductSpanDom = document.querySelector(".item-qty");
let badgeDom = document.querySelector(".badge");
let shoppingCartIcon = document.querySelector(".shoppingCart");
let cartProductMenu = document.querySelector(".cart-products");

// check if there is items in localStorage
let addedItem = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];

if (addedItem) {
  addedItem.map((item) => {
    cartProductDivDom.innerHTML += `<p>${item.title} <spsn class="item-qty">${item.qty}</spsn></p>`;
  });
  badgeDom.style.display = "block";
  badgeDom.innerHTML = addedItem.length;
}
// open cart menu
shoppingCartIcon.addEventListener("click", openCartMenu);

// open cart menu
function openCartMenu() {
  if (cartProductDivDom.innerHTML != "") {
    if (cartProductMenu.style.display == "none") {
      cartProductMenu.style.display = "block";
    } else {
      cartProductMenu.style.display = "none";
    }
  }
}
