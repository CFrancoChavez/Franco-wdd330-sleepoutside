// import ProductData from './ProductData.mjs';
// import ProductList from './ProductList.mjs';

// const dataSource = new ProductData('tents');
// const listElement = document.querySelector('.product-list');

// const productList = new ProductList('tents', dataSource, listElement);
// productList.init();
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs'; // <-- Importar la nueva función

loadHeaderFooter(); // <-- Llamar a la función para cargar el header y footer
const dataSource = new ProductData('tents');

const element = document.querySelector('.product-list');

const productList = new ProductList('Tents', dataSource, element);

productList.init();