let allProducts = [];
function drawCartProductsUI() {
  if (JSON.parse(localStorage.getItem("productsInCart")).length == 0)
    document.querySelector(".section-form").style.display = "block";
  document.querySelector(".noProducts").innerHTML = "There Is No Items !!";

  let products =
    JSON.parse(localStorage.getItem("productsInCart")) || allProducts;
  let productsUI = products.map((item) => {
    return `<div class="product-item" >
  <img src=${item.imageUrl} alt="" class="product-item-img">
  <div class="product-item-desc">
      <h2>${item.title}</h2>
      <p>${item.desc}</p>
      <span>Size: ${item.size}</span><br>
      <span>Quantity: ${item.qty}</span>

  </div>
  <div class="product-item-actions">
      <button class="add-to-card" onclick="removeFromCart(${item.id})"/>
         Remove From Cart
      </button>
  </div>
  </div>`;
  });
  document.querySelector(".products").innerHTML = productsUI.join("");
}

drawCartProductsUI();

function removeFromCart(id) {
  let productsInCart = localStorage.getItem("productsInCart");
  let items = JSON.parse(productsInCart);
  let filteredItems = items.filter((item) => item.id !== id);
  localStorage.setItem("productsInCart", JSON.stringify(filteredItems));
  drawCartProductsUI(filteredItems);

  // let allItem = JSON.parse(localStorage.getItem("allItems"));
  // let filteredAllItem = allItem.filter((item) => item.id !== id);
  // localStorage.setItem("allItems", JSON.stringify(filteredAllItem));
}
