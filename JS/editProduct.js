// // variavles
let products = JSON.parse(localStorage.getItem("products")) || productsDB;
let productsId = JSON.parse(localStorage.getItem("editProduct"));
let getProduct = products.find((i) => i.id === productsId);

let inputFile = document.getElementById("upload-image-file");
let productName = document.getElementById("product-name");
let productDesc = document.getElementById("product-desc");
let productSizeSelect = document.getElementById("product-size");
let updateForm = document.getElementById("update-form");
let productImage;

productName.value = getProduct.title;
productDesc.value = getProduct.desc;
productSizeSelect.value = getProduct.size;
productImage = getProduct.imageUrl;

// Events
updateForm.addEventListener("submit", updateProdectFun);
inputFile.addEventListener("change", uploadImage);

function updateProdectFun(e) {
  e.preventDefault();
  getProduct.title = productName.value;
  getProduct.desc = productDesc.value;
  getProduct.size = productSizeSelect.value;
  getProduct.imageUrl = productImage;

  localStorage.setItem("products", JSON.stringify(products));
  setTimeout(() => {
    window.location = "index.html";
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
    productImage = reader.result;
  };

  reader.onerror = function () {
    alert("Error !!");
  };
}
