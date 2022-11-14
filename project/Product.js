// https://mamtn011.github.io/cart/db.json

class Product {
  async getProduct() {
    const res = await fetch("https://mamtn011.github.io/cart/db.json");
    const data = await res.json();
    return data;
  }
}

const product = new Product();
export default product;
