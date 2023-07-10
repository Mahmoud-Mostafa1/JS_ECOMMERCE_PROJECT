function drawFavoritesProductsUI() {
  if (JSON.parse(localStorage.getItem("productsFavorite")).length == 0)
    document.querySelector(".section-form").style.display = "block";
  document.querySelector(".noProducts").innerHTML = "There Is No Items !!";

  let products = JSON.parse(localStorage.getItem("productsFavorite"));
  let productsUI = products.map((item) => {
    return `<div class="product-item" >
    <img src=${item.imageUrl} alt="" class="product-item-img">
    <div class="product-item-desc">
        <h2>${item.title}</h2>
        <p>${item.desc}</p>
        <span>Size: ${item.size}</span>
        <span>Quantity: ${item.qty}</span>
  
    </div>
    <div class="product-item-actions">
        <button class="add-to-card" onclick="removeFromCart(${item.id})"/>
           Remove From Favorite
        </button>
    </div>
    </div>`;
  });
  document.querySelector(".products").innerHTML = productsUI.join("");
}

drawFavoritesProductsUI();

function removeFromCart(id) {
  let productsFavorite = localStorage.getItem("productsFavorite");
  let items = JSON.parse(productsFavorite);
  let favoriteProducts = JSON.parse(localStorage.getItem("products"));
  favoriteProducts.map((item) => {
    if (item.id == id) {
      item.liked = "";
    }
  });
  localStorage.setItem("products", JSON.stringify(favoriteProducts));

  let filteredItems = items.filter((item) => item.id !== id);
  localStorage.setItem("productsFavorite", JSON.stringify(filteredItems));
  drawFavoritesProductsUI(filteredItems);

  // let allItem = JSON.parse(localStorage.getItem("allItems"));
  // let filteredAllItem = allItem.filter((item) => item.id !== id);
  // localStorage.setItem("allItems", JSON.stringify(filteredAllItem));
  // drawFavoritesProductsUI(filteredAllItem);
}
