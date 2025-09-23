import { setLocalStorage } from './utils.mjs';

function renderProductDetails(product) {
  const html = `
    <h3 class="product-brand">${product.Brand.Name}</h3>
    <h2 class="product-name">${product.NameWithoutBrand}</h2>
    <img
      class="product-image"
      src="${product.Image}"
      alt="Image of ${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product-color">${product.Colors[0].ColorName}</p>
    <p class="product-description">
      ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-action">
      <button class="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  `;
  document.querySelector('.product-detail').innerHTML = html;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    renderProductDetails(this.product);

    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    setLocalStorage('so-cart', this.product);
  }
}