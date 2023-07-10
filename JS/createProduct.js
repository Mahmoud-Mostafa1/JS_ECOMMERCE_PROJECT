// variavles
let inputFile = document.getElementById("upload-image-file");
let productName = document.getElementById("product-name");
let productDesc = document.getElementById("product-desc");
let productSizeSelect = document.getElementById("product-size");
let createForm = document.getElementById("create-form");
let productSizeValue;
let productImage;

// Events
productSizeSelect.addEventListener("change", getProductSizeValue);
createForm.addEventListener("submit", createProdectForm);
inputFile.addEventListener("change", uploadImage);

// Function
function getProductSizeValue(e) {
  productSizeValue = e.target.value;
}

function createProdectForm(e) {
  e.preventDefault();
  let allProducts = JSON.parse(localStorage.getItem("products")) || productsDB;
  let nameValue = productName.value;
  let descValue = productDesc.value;

  if (descValue && nameValue) {
    let obj = {
      id: allProducts.length + 1,
      qty: 1,
      imageUrl: productImage,
      size: productSizeValue,
      title: nameValue,
      desc: descValue,
      isMe: "Y",
    };
    let newProducts = [...allProducts, obj];
    localStorage.setItem("products", JSON.stringify(newProducts));

    productName.value = "";
    productDesc.value = "";
    productSizeSelect.value = "";
    inputFile.value = "";

    setTimeout(() => {
      window.location = "index.html";
    }, 500);
  } else {
    alert("Enter Data ...");
  }
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
  // console.log(reader);

  reader.readAsDataURL(file);

  reader.onload = function () {
    productImage = reader.result;
  };

  reader.onerror = function () {
    alert("Error !!");
  };
}
