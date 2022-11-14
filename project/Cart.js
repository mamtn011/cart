import UI from "./Ui.js";
import Storage from "./Storage.js";
class Cart {
  #incrementCart;
  #getProduct(id) {
    return UI.protucts.find((product) => id === product.id);
  }
  #setIncrementCart() {
    if (localStorage.getItem("myCartProducts")) {
      const storage = JSON.parse(localStorage.getItem("myCartProducts"));
      this.#incrementCart = storage.length;
    } else {
      this.#incrementCart = 0;
    }
  }
  #getDomElm() {
    const { productsGridElm, cartCountElm, cartIcon, modalContentElm } =
      UI.selectDomElm();
    return { productsGridElm, cartCountElm, cartIcon, modalContentElm };
  }
  #getId(evt) {
    if (evt.target.classList.contains("cart-btn")) {
      return Number(evt.target.parentElement.dataset.id);
    }
  }
  #incrementCartToUI() {
    const { cartCountElm } = this.#getDomElm();
    this.#incrementCart++;
    cartCountElm.textContent = this.#incrementCart;
  }
  #getCartProductId(target) {
    const id = Number(target.parentElement.dataset.id);
    return id;
  }
  #displayModalBlock(target) {
    target.parentElement.parentElement.style.display = "none";
  }
  #manipulateCart() {
    UI.showStorageDataToUI();
    UI.showCartCountAfterManipulate();
    this.#setIncrementCart();
  }
  #handleCartProducts(evt) {
    if (evt.target.classList.contains("continue-shopping")) {
      this.#displayModalBlock(evt.target);
    } else if (evt.target.classList.contains("modal-delete")) {
      const id = this.#getCartProductId(evt.target);
      Storage.removeStorageData(id);
      this.#manipulateCart();
    } else if (evt.target.classList.contains("modal-inc")) {
      const id = this.#getCartProductId(evt.target);
      Storage.increaseStorageData(id);
      this.#manipulateCart();
    } else if (evt.target.classList.contains("modal-dec")) {
      const id = this.#getCartProductId(evt.target);
      Storage.decreaseStorageData(id);
      this.#manipulateCart();
    }
  }
  init() {
    const { productsGridElm, cartCountElm, cartIcon, modalContentElm } =
      this.#getDomElm();
    this.#setIncrementCart();
    cartCountElm.textContent = this.#incrementCart;
    productsGridElm.addEventListener("click", (evt) => {
      const id = this.#getId(evt);
      if (id) {
        this.#incrementCartToUI();
        const product = this.#getProduct(id);
        Storage.saveToStorage(product);
      }
    });
    cartIcon.addEventListener("click", UI.showStorageDataToUI);
    modalContentElm.addEventListener("click", (evt) =>
      this.#handleCartProducts(evt)
    );
  }
}

const cart = new Cart();
export default cart;
