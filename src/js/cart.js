// src/js/cart.js

// import { loadHeaderFooter } from './utils.mjs';
// import ShoppingCart from './ShoppingCart.mjs'; // <-- Importar la nueva clase

// // 1. Cargar el encabezado y pie de página dinámicamente
// loadHeaderFooter();

// // 2. Inicializar la clase ShoppingCart para renderizar los productos
// const cart = new ShoppingCart('so-cart', '.product-list');

// // El init() manejará la obtención de datos y la renderización
// cart.init();
import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();