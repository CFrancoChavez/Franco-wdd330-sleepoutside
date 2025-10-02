
// import { getLocalStorage, setLocalStorage } from './utils.mjs';

// export default class ProductDetails {

//   constructor(productId, dataSource) {
//     this.productId = productId;
//     this.product = {};
//     this.dataSource = dataSource;
//   }

//   async init() {
//     // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
//     this.product = await this.dataSource.findProductById(this.productId);
//     // the product details are needed before rendering the HTML
//     this.renderProductDetails();
//     // once the HTML is rendered, add a listener to the Add to Cart button
//     // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
//     document
//       .getElementById('addToCart')
//       .addEventListener('click', this.addProductToCart.bind(this));
//   }

//   addProductToCart() {
//     const cartItems = getLocalStorage('so-cart') || [];
//     cartItems.push(this.product);
//     setLocalStorage('so-cart', cartItems);
//   }

//   renderProductDetails() {
//     productDetailsTemplate(this.product);
//   }
// }

// function productDetailsTemplate(product) {
//   document.querySelector('h2').textContent = product.Brand.Name;
//   document.querySelector('h3').textContent = product.NameWithoutBrand;

//   const productImage = document.getElementById('productImage');
//   productImage.src = product.Image;
//   productImage.alt = product.NameWithoutBrand;

//   document.getElementById('productPrice').textContent = product.FinalPrice;
//   document.getElementById('productColor').textContent = product.Colors[0].ColorName;
//   document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

//   document.getElementById('addToCart').dataset.id = product.Id;
// }

// // ************* Alternative Display Product Details Method *******************
// // function productDetailsTemplate(product) {
// //   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
// //     <h2 class="divider">${product.NameWithoutBrand}</h2>
// //     <img
// //       class="divider"
// //       src="${product.Image}"
// //       alt="${product.NameWithoutBrand}"
// //     />
// //     <p class="product-card__price">$${product.FinalPrice}</p>
// //     <p class="product__color">${product.Colors[0].ColorName}</p>
// //     <p class="product__description">
// //     ${product.DescriptionHtmlSimple}
// //     </p>
// //     <div class="product-detail__add">
// //       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
// //     </div></section>`;
// // }

// src/js/ProductDetails.mjs

// import { getLocalStorage, setLocalStorage } from './utils.mjs';

// function productDetailsTemplate(product) {
//   // Manejo de la imagen: usa el path correcto del objeto product.
//   // Se asume que la ruta de la imagen está en product.Image.
//   const imagePath = typeof product.Image === 'string' 
//       ? product.Image 
//       : (product.Image?.External || `/images/placeholder.jpg`); 

//   // RETORNA la cadena HTML completa para ser inyectada
//   return `
//     <section class="product-detail">
//       <h3 class="card__brand">${product.Brand.Name}</h3>
//       <h2 class="divider">${product.NameWithoutBrand}</h2>
//       <img
//         class="divider"
//         src="${imagePath}" 
//         alt="${product.NameWithoutBrand}"
//         id="productImage"
//       />
//       <p class="product-card__price">$${product.FinalPrice}</p>
//       <p class="product__color">${product.Colors[0].ColorName}</p>
//       <p class="product__description">
//         ${product.DescriptionHtmlSimple}
//       </p>
//       <div class="product-detail__add">
//         <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//       </div>
//     </section>
//   `;
// }

// export default class ProductDetails {
//   constructor(productId, dataSource) {
//     this.productId = productId;
//     this.product = {};
//     this.dataSource = dataSource;
//   }

//   async init() {
//     this.product = await this.dataSource.findProductById(this.productId);
    
//     if (!this.product) {
//         //console.error('Producto no encontrado:', this.productId);
//         // Puedes añadir una redirección o un mensaje de error aquí
//         document.querySelector('main').innerHTML = '<h2>Producto no encontrado.</h2>';
//         return; 
//     }
//     // CRÍTICO: Forzar la imagen del producto a ser la PrimaryLarge para la vista de detalle
//         // Esto asegura que la plantilla que usa ${product.Image} funcione
//     this.product.Image = this.product.Images.PrimaryLarge; 
        
//     document.title = this.product.Name; 
//     this.renderProductDetails();
    
//     document
//       .getElementById('addToCart')
//       .addEventListener('click', this.addProductToCart.bind(this));
//   }

//   addProductToCart() {
//     const cartItems = getLocalStorage('so-cart') || [];
//     cartItems.push(this.product);
//     setLocalStorage('so-cart', cartItems);
//   }

//   // MÉTODO CORREGIDO: Inyecta el HTML de la plantilla en el contenedor <main>
//   renderProductDetails() {
//     const mainElement = document.querySelector('main');
    
//     // Inyecta el HTML generado por la plantilla.
//     mainElement.innerHTML = productDetailsTemplate(this.product);
//   }
// }
// ProductDetails.mjs (CORREGIDO)

// import { getLocalStorage, setLocalStorage } from './utils.mjs';

// function productDetailsTemplate(product) {
//   // Solo devuelve el contenido interno, NO las etiquetas <section>
//   const imagePath = product.Images.PrimaryLarge;

//   return `
//     <h3 class="card__brand">${product.Brand.Name}</h3>
//     <h2 class="divider">${product.Name}</h2>
//     <img
//       class="divider product-detail__image"
//       src="${imagePath}"
//       alt="${product.Name}"
//       id="productImage"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
    
//     <p class="product__color">Color: ${product.Colors[0]?.ColorName || 'N/A'}</p>
    
//     <p class="product__description">
//       ${product.DescriptionHtmlSimple || product.DescriptionHtmlCard || 'Descripción no disponible.'}
//     </p>
    
//     <div class="product-detail__add">
//       <button id="add-to-cart" data-id="${product.Id}">Add to Cart</button>
//     </div>
//   `;
// }

// export default class ProductDetails {
//   constructor(productId, dataSource) {
//     this.productId = productId;
//     this.product = {};
//     this.dataSource = dataSource;
//   }

//   async init() {
//     this.product = await this.dataSource.findProductById(this.productId);
    
//     // CRÍTICO: Si el producto es null (por error 404 o API), mostramos el mensaje.
//     if (!this.product) {
//         // Inyectamos el mensaje en el contenedor principal del main
//         document.querySelector('main').innerHTML = '<div id="product-detail-output"><h2>Producto no encontrado.</h2></div>';
//         return;
//     }

//     this.renderProductDetails(); 
    
//     // CRÍTICO: Buscar el elemento *después* de que se ha renderizado.
//     document
//       .getElementById('add-to-cart') 
//       .addEventListener('click', this.addProductToCart.bind(this));
//   }

//   addProductToCart() {
//     const cartItems = getLocalStorage('so-cart') || [];
//     cartItems.push(this.product);
//     setLocalStorage('so-cart', cartItems);
//   }

//   renderProductDetails() {
//     const outputElement = document.querySelector('#product-detail-output'); 
    
//     // AÑADE LA SECCIÓN CONTENEDORA QUE LOS ESTILOS ESPERAN
//     const htmlContent = `
//       <section class="product-detail">
//         ${productDetailsTemplate(this.product)}
//       </section>
//     `;

//     // Limpia e inyecta el contenido en el div de salida
//     outputElement.innerHTML = '';
//     outputElement.insertAdjacentHTML('beforeend', htmlContent);
//   }
// }
import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
    document
      .getElementById('add-to-cart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage('so-cart') || [];
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector('#p-brand').textContent = product.Brand.Name;
  document.querySelector('#p-name').textContent = product.NameWithoutBrand;

  const productImage = document.querySelector('#p-image');
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const euroPrice = new Intl.NumberFormat('de-DE',
    {
      style: 'currency', currency: 'EUR',
    }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector('#p-price').textContent = `${euroPrice}`;
  document.querySelector('#p-color').textContent = product.Colors[0].ColorName;
  document.querySelector('#p-description').innerHTML = product.DescriptionHtmlSimple;

  document.querySelector('#add-to-cart').dataset.id = product.Id;
}

// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }