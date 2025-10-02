// src/js/cart.js

import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs"; // <-- Importar la nueva clase

// 1. Cargar el encabezado y pie de página dinámicamente
loadHeaderFooter();

// 2. Inicializar la clase ShoppingCart para renderizar los productos
const cart = new ShoppingCart("so-cart", ".product-list");

// El init() manejará la obtención de datos y la renderización
cart.init();
