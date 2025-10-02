// src/js/product-listing.js

import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

// 1. Obtener la categoría de la URL (e.g., 'tents', 'backpacks', etc.)
const category = getParam('category');

// 2. Crear instancia de ProductData (YA NO le pasaremos la categoría al constructor)
// NOTA: Una vez que hagas la Fase 3, el constructor de ProductData estará vacío.
const dataSource = new ProductData();

// 3. Obtener el elemento del DOM y crear la lista
const listElement = document.querySelector('.product-list');

// 4. Crear la instancia de ProductList, pasándole la categoría y el dataSource
// Si no hay categoría en la URL, se usará 'tents' por defecto.
const productList = new ProductList(
  category || 'tents',
  dataSource,
  listElement,
);

// 5. Inicializar la lista (esto llamará a getData(category) dentro)
productList.init();
