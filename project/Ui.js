import Product from "./Product.js";
import Cart from "./Cart.js";
import Storage from "./Storage.js";
class UI {
  #categories;
  #products;
  get protucts() {
    return this.#products;
  }
  selectDomElm() {
    const categoryElm = document.querySelector("#items");
    const itemNameElm = document.querySelector(".item-name");
    const cartCountElm = document.querySelector(".cart-count");
    const productsGridElm = document.querySelector(".grid");
    const continueElm = document.querySelectorAll(".continue-shopping");
    const cartIcon = document.querySelector(".cart");
    const cartContentElm = document.querySelector(".cart-products");
    const modalContentElm = document.querySelector(".modal-content");
    const cartPriceElm = document.querySelector(".modal-price");
    const cartDecElm = document.querySelector(".modal-dec");
    const cartIncElm = document.querySelector(".modal-inc");
    const cartQtyElm = document.querySelector(".modal-qty");
    const cartDelBtn = document.querySelector(".modal-delete");
    return {
      categoryElm,
      itemNameElm,
      cartCountElm,
      productsGridElm,
      cartIcon,
      continueElm,
      cartContentElm,
      cartPriceElm,
      cartDecElm,
      cartIncElm,
      cartQtyElm,
      cartDelBtn,
      modalContentElm,
    };
  }
  async #getApiData() {
    const product = await Product.getProduct();
    this.#categories = product.category;
    this.#products = product.product;
  }
  #getCategoryId(categoryValue) {
    if (categoryValue === "All") return;
    return this.#categories.find((category) => categoryValue === category.name);
  }
  #getFilterdProducts(category) {
    let products = [];
    if (!category) {
      products = this.#products;
    } else {
      products = this.#products.filter(
        (product) => category.id === product.categoryId
      );
    }
    return products;
  }
  #showProductToUI(categoryName = "All") {
    const { productsGridElm, itemNameElm } = this.selectDomElm();
    productsGridElm.textContent = "";
    itemNameElm.textContent = categoryName;
    const category = this.#getCategoryId(categoryName);
    const products = this.#getFilterdProducts(category);
    let elm = "";
    products.forEach((product) => {
      const { id, title, description, img, price } = product;

      elm += `<div class="content" data-id="${id}">
      <img src="img/${img}" class="img" />
      <h3 class="title">${title}</h3>
      <p class="description">
      ${description}
      </p>
      <p class="price">${price} BDT</p>
      <button class="cart-btn">Add to Cart</button>
    </div>`;
    });
    productsGridElm.insertAdjacentHTML("afterbegin", elm);
  }
  #filterByCategory(categoryElm) {
    this.#showProductToUI(categoryElm.value);
  }
  showStorageDataToUI() {
    const { cartContentElm, continueElm, cartPriceElm, cartQtyElm } =
      ui.selectDomElm();
    cartContentElm.textContent = "";

    const products = Storage.getStorageData();
    let filterd = [];
    let elm = "";
    if (products.length > 0) {
      const ids = products.map((el) => el.id);
      const obj = ids.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
      }, {});

      for (let i in obj) {
        filterd.push(products.find((el) => el.id === Number(i)));
      }
      filterd.forEach((product) => {
        const { id, title, img, price } = product;
        const qty = obj[id];

        elm += `<div style="min-width: 200px; margin: auto" data-id="${id}">
        <img
          src="img/${img}"
          width="50"
          height="50"
          style="float: left"
        />
        <span class="modal-name">${title}:</span>
        <span class="modal-price">TK: ${price * qty}</span>
        <span class="modal-dec">--</span
        ><input type="text" value="${qty}" class="modal-qty" readonly /><span
          class="modal-inc"
          >+</span
        >
        <button class="modal-delete">Delete</button>
      </div>`;
        // cartQtyElm.value = qty;
      });
    } else {
      elm = `<h2 style="text-align: center">No product to checkout!</h2>`;
    }
    cartContentElm.parentElement.parentElement.style.display = "block";
    cartContentElm.insertAdjacentHTML("afterbegin", elm);
    // continueElm.forEach((el) => {
    //   el.addEventListener("click", (evt) => {
    //     evt.target.parentElement.parentElement.style.display = "none";
    //   });
    // });
  }
  showCartCountAfterManipulate() {
    const { cartCountElm } = this.selectDomElm();
    const products = Storage.getStorageData();
    cartCountElm.textContent = products.length;
  }
  async init() {
    const { categoryElm } = this.selectDomElm();
    await this.#getApiData();
    this.#showProductToUI();
    categoryElm.addEventListener("change", () =>
      this.#filterByCategory(categoryElm)
    );
    Cart.init();
  }
}

const ui = new UI();
export default ui;
