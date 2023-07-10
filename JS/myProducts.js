let products = JSON.parse(localStorage.getItem("products")) || productsDB;

let drawProductsUI;
(drawProductsUI = function (products) {
  let myProducts = products.filter((item) => item.isMe === "Y");
  if (myProducts.length === 0)
    document.querySelector(".section-form").style.display = "block";
  document.querySelector(".noProducts").innerHTML = "There Is No Products !!";

  let productsUI = myProducts.map((item) => {
    return `<div class="product-item" style="border:${
      item.isMe === "Y" ? "1px solid green" : ""
    }" >
  <img src=${item.imageUrl} alt="" class="product-item-img">
  <div class="product-item-desc">
      <a onclick='saveItemData(${item.id})'>${item.title}</a>
      <p>${item.desc}</p>
      <span>Size: ${item.size}</span>
      <button class="edit-product" onclick="editProduct(${
        item.id
      })">Edit Product</button>
  </div>
  <i class=" delete fa-solid fa-circle-xmark" onclick="deletProduct(${
    item.id
  })"></i>
  </div>`;
  });

  document.querySelector(".products").innerHTML = productsUI.join("");
})(JSON.parse(localStorage.getItem("products")) || productsDB);

// Edit Product
function editProduct(id) {
  localStorage.setItem("editProduct", id);
  window.location = "editProduct.html";
}
// Delete Product
function deletProduct(id) {
  let myProducts = products.filter((item) => item.isMe === "Y");

  let filtered = myProducts.filter((i) => i.id !== id);

  products = products.filter((i) => i.id !== id);

  localStorage.setItem("products", JSON.stringify(products));
  drawProductsUI(filtered);
}
