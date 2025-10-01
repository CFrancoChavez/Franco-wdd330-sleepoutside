// src/js/ShoppingCart.mjs

// 1. CORRECCIÓN: Solo necesitamos 'getLocalStorage'.
import { getLocalStorage } from './utils.mjs'; 


function cartItemTemplate(item) {
  // Asegúrate de que las rutas relativas funcionen desde cart/index.html
  const productUrl = `../product_pages/index.html?product=${item.Id}`;
  
  // Plantilla HTML del ítem del carrito
  const newItem = `<li class='cart-card divider'>
  <a href='${productUrl}' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='${productUrl}'>
    <h2 class='card__name'>${item.NameWithoutBrand}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, listElementSelector) {
    this.key = key; // Clave de localStorage ('so-cart')
    this.listElement = document.querySelector(listElementSelector); // '.product-list'
    this.cartItems = [];
  }

  async init() {
    // 2. CORRECCIÓN: Añadir un OR (|| []) en caso de que localStorage esté vacío.
    this.cartItems = getLocalStorage(this.key) || []; 
    
    this.renderCart();
  }

  renderCart() {
    // 1. Ocultar el total si no hay artículos
    const totalElement = document.querySelector('.cart-footer');
    if (this.cartItems.length === 0) {
      if (this.listElement) {
        this.listElement.innerHTML = '<p>Tu carrito está vacío.</p>';
      }
      if (totalElement) {
        totalElement.classList.add('hide');
      }
      return;
    }

    // 2. Renderizar la lista
    if (this.listElement) {
      const htmlStrings = this.cartItems.map(cartItemTemplate);
      this.listElement.innerHTML = htmlStrings.join('');
    }
    
    // 3. Mostrar el total (asumiendo que .cart-footer ya existe)
    if (totalElement) {
      totalElement.classList.remove('hide');
      
      // Calcular y mostrar el total (si tienes un elemento para el total)
      const total = this.cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
      const totalDisplay = document.querySelector('.cart-total');
      if (totalDisplay) {
        totalDisplay.innerHTML = `Total: $${total.toFixed(2)}`;
      }
    }
  }
}