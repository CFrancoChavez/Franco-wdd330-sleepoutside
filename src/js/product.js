// import { getLocalStorage, setLocalStorage } from './utils.mjs';
// import ProductData from './ProductData.mjs';

// const dataSource = new ProductData('tents');

// // function addProductToCart(product) {
// //   setLocalStorage('so-cart', product);
// // }
// function addProductToCart(product) {
//   // 1. Obtiene la lista actual del localStorage
//   const cartItems = getLocalStorage('so-cart') || [];

//   // 2. Agrega el nuevo producto a la lista
//   cartItems.push(product);

//   // 3. Guarda la lista completa y actualizada en localStorage
//   setLocalStorage('so-cart', cartItems);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById('addToCart')
//   .addEventListener('click', addToCartHandler);
import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

// Llamar a la función al inicio para cargar el header y footer
loadHeaderFooter();

const productId = getParam('product');
const dataSource = new ProductData('tents');
const product = new ProductDetails(productId, dataSource);

product.init();
