class Storage {
  saveToStorage(product) {
    let productS = [];
    if (localStorage.getItem("myCartProducts")) {
      productS = JSON.parse(localStorage.getItem("myCartProducts"));
      productS.push(product);
    } else {
      productS.push(product);
    }
    localStorage.setItem("myCartProducts", JSON.stringify(productS));
  }
  getStorageData() {
    if (localStorage.getItem("myCartProducts")) {
      return JSON.parse(localStorage.getItem("myCartProducts"));
    } else {
      return;
    }
  }
  increaseStorageData(id) {
    let products = this.getStorageData();
    products = products.find((product) => product.id === id);
    this.saveToStorage(products);
  }
  decreaseStorageData(id) {
    let products = this.getStorageData();
    const index = products.indexOf(
      products.find((product) => product.id === id)
    );
    products.splice(index, 1);
    localStorage.setItem("myCartProducts", JSON.stringify(products));
  }
  removeStorageData(id) {
    let products = this.getStorageData();
    products = products.filter((product) => product.id !== id);
    localStorage.setItem("myCartProducts", JSON.stringify(products));
  }
}

const storage = new Storage();
export default storage;
