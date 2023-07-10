let productsDom = document.querySelector(".products");
// let shoppingCartIcon = document.querySelector(".shoppingCart");
// let cartProductMenu = document.querySelector(".cart-products");
// let cartProductDivDom = document.querySelector(".cart-products div");
// let badgeDom = document.querySelector(".badge");
let products = productsDB;

// open cart menu
// shoppingCartIcon.addEventListener("click", openCartMenu);

// display products
let drawProductsUI;
(drawProductsUI = function (productss) {
  let productsUI = productss.map((item) => {
    return `<div class="product-item" style="border:${
      item.isMe === "Y" ? "1px solid green" : ""
    }" >
  <img src=${item.imageUrl} alt="" class="product-item-img">
  <div class="product-item-desc">
      <a onclick='saveItemData(${item.id})'>${item.title}</a>
      <p>${item.desc}</p>
      <span>Size: ${item.size}</span>
      ${
        item.isMe === "Y"
          ? "<button class='edit-product' onclick='editProduct(" +
            item.id +
            ")'>Edit Product</button>"
          : ""
      }
  </div>
  <div class="product-item-actions">
      <button class="add-to-card" onclick="addToCart(${item.id})"/>
          Add To Cart
      </button>
      <i onclick="addToFavorite(${item.id})"style="color:${
      item.liked == true ? "red" : ""
    }" class="heart ${
      item.liked == true
        ? "fa-solid fa-heart-circle-check"
        : "fa-solid fa-heart-circle-plus"
    }"></i>
  </div>
  </div>`;
  });

  document.querySelector(".products").innerHTML = productsUI.join("");
})(JSON.parse(localStorage.getItem("products")) || products);

// // check if there is items in localStorage
// let addedItem = localStorage.getItem("productsInCart")
//   ? JSON.parse(localStorage.getItem("productsInCart"))
//   : [];

// if (addedItem) {
//   addedItem.map((item) => {
//     cartProductDivDom.innerHTML += `<p>${item.title} ${item.qty}</p>`;
//   });
//   badgeDom.style.display = "block";
//   badgeDom.innerHTML = addedItem.length;
// }

// add to cart
function addToCart(id) {
  if (localStorage.getItem("username")) {
    let products = JSON.parse(localStorage.getItem("products")) || products;
    let product = products.find((item) => item.id === id);
    let isProductInCart = addedItem.some((i) => i.id === product.id);
    if (isProductInCart) {
      addedItem = addedItem.map((p) => {
        if (p.id === product.id) p.qty += 1;
        return p;
      });
    } else {
      addedItem.push(product);
    }

    // UI
    cartProductDivDom.innerHTML = "";

    addedItem.forEach((item) => {
      cartProductDivDom.innerHTML += `<p>${item.title} ${item.qty}</p>`;
    });

    //Save Data
    localStorage.setItem("productsInCart", JSON.stringify(addedItem));

    // Add Counter of Items
    let cartProductItems = document.querySelectorAll(".cart-products div p");
    badgeDom.style.display = "block";
    badgeDom.innerHTML = cartProductItems.length;
  } else {
    window.location = "register.html";
  }
}

// // open cart menu
// function openCartMenu() {
//   if (cartProductDivDom.innerHTML != "") {
//     if (cartProductMenu.style.display == "none") {
//       cartProductMenu.style.display = "block";
//     } else {
//       cartProductMenu.style.display = "none";
//     }
//   }
// }

function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "cartDetails.html";
}

// Search function
let input = document.getElementById("search");

input.addEventListener("keyup", function (e) {
  search(input.value, JSON.parse(localStorage.getItem("products")));

  if (e.target.value.trim() === "") {
    drawProductsUI(JSON.parse(localStorage.getItem("products")));
  }
});

function search(title, myArray) {
  let arr = myArray.filter(
    (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
  );
  drawProductsUI(arr);
}

// add to favorite
let favoriteItems = localStorage.getItem("productsFavorite")
  ? JSON.parse(localStorage.getItem("productsFavorite"))
  : [];

let favoriteProducts = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];
if (favoriteProducts.length !== 0) {
  products = favoriteProducts;
  drawProductsUI(products);
}
function addToFavorite(id) {
  if (localStorage.getItem("username")) {
    let choosenItem = products.find((item) => item.id === id);
    // choosenItem.liked = true;
    favoriteItems = [...favoriteItems, choosenItem];

    // let uniqueProducts = getUniqueArr(favoriteItems, "id");
    // localStorage.setItem("productsFavorite", JSON.stringify(uniqueProducts));
    products.map((item) => {
      if (item.id === choosenItem.id) {
        if (item.liked == true) {
          item.liked = "";
        } else {
          item.liked = true;
        }
      }
      let uniqueProducts2 = products.filter((item) => item.liked == true);
      localStorage.setItem("productsFavorite", JSON.stringify(uniqueProducts2));
    });
    localStorage.setItem("products", JSON.stringify(products));
    drawProductsUI(products);
  } else {
    window.location = "login.html";
  }
}

function getUniqueArr(arr, filterType) {
  let uniqueArr = arr
    .map((i) => i[filterType])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);
  return uniqueArr;

  //  ******* Other Solving *********

  // let uniqueIds = [];
  // let uniqueArr = arr.filter((e) => {
  //   let isDuplicated = uniqueIds.includes(e.id);
  //   return !isDuplicated && uniqueIds.push(e.id);
  // });
  // console.log(uniqueArr);
  // return uniqueArr;
}

// filter products by size
let sizeFilter = document.getElementById("size-filter");

sizeFilter.addEventListener("change", getProductsFilterBySize);

function getProductsFilterBySize(e) {
  let products = productsDB;
  let val = e.target.value;
  let product = JSON.parse(localStorage.getItem("products")) || products;
  if (val === "all") {
    drawProductsUI(product);
  } else {
    products = products.filter((i) => i.size === val);
    drawProductsUI(products);
  }
}

// Edit Product
function editProduct(id) {
  localStorage.setItem("editProduct", id);
  window.location = "editProduct.html";
}
