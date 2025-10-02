// // import { renderListWithTemplate } from './utils.mjs';

// // function productCardTemplate(product) {
// //   return `<li class="product-card">
// //     <a href="product_pages/index.html?product=${product.Id}">
// //       <img
// //         src="${product.Image}"
// //         alt="Image of ${product.NameWithoutBrand}"
// //       />
// //       <h3 class="card__brand">${product.Brand.Name}</h3>
// //       <h2 class="card__name">${product.NameWithoutBrand}</h2>
// //       <p class="product-card__price">$${product.FinalPrice}</p>
// //     </a>
// //   </li>`;
// // }

// // export default class ProductList {
// //   constructor(category, dataSource, listElement) {
// //     this.category = category;
// //     this.dataSource = dataSource;
// //     this.listElement = listElement;
// //   }

// //   async init() {
// //     const list = await this.dataSource.getData();
// //     this.renderList(list);
// //   }

// //   renderList(list) {
// //     renderListWithTemplate(
// //       productCardTemplate,
// //       this.listElement,
// //       list,
// //       'afterbegin',
// //       true
// //     );
// //   }
// // }  
// import { renderListWithTemplate } from './utils.mjs';

// // --- Template Function ---
// function productCardTemplate(product) {
//   // Asegúrate de que las propiedades del producto y la URL coincidan con tu estructura
//   return `<li class="product-card">
//     <a href="../product_pages/index.html?product=${product.Id}">
//       <img
//         src="${product.Image}" 
//         alt="${product.NameWithoutBrand}"
//       />
//       <h3 class="card__brand">${product.Brand.Name}</h3>
//       <h2 class="card__name">${product.NameWithoutBrand}</h2>
//       <p class="product-card__price">$${product.FinalPrice}</p>
//     </a>
//   </li>`;
// }

// // --- ProductList Class ---
// export default class ProductList {
//   constructor(category, dataSource, listElement) {
//     this.category = category;
//     this.dataSource = dataSource;
//     this.listElement = listElement;
//   }

//   async init() {
//     // 1. Obtener la lista de productos
//     const list = await this.dataSource.getData();
//     // 2. Renderizar la lista
//     this.renderList(list);
//   }

//   renderList(list) {
//     // Usamos el utility function para renderizar la lista.
//     // Usamos 'afterbegin' como posición por defecto y 'clear: true' para reemplazar el contenido existente.
//     renderListWithTemplate(
//       productCardTemplate,
//       this.listElement,
//       list,
//       'afterbegin',
//       true // Importante: limpia el contenido HTML existente.
//     );
//   }
// }
// import { renderListWithTemplate } from './utils.mjs';

// function productCardTemplate(product) {
//   return `
//     <li class="product-card">
//       <a href="../product_pages/index.html?product=${product.Id}">
//         <img src="${product.Image}" alt="${product.Name}">
//         <h2>${product.Brand.Name}</h2>
//         <h3>${product.Name}</h3>
//         <p class="product-card__price">$${product.FinalPrice}</p>
//       </a>
//     </li>
//     `;
// }

// export default class ProductList {
//   constructor(category, dataSource, listElement) {
//     this.category = category;
//     this.dataSource = dataSource;
//     this.listElement = listElement;
//   }

//   async init() {
//     const list = await this.dataSource.getData();
//     this.renderList(list);
//   }

//   renderList(list) {
//     // const htmlStrings = list.map(productCardTemplate);
//     // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

//     // apply use new utility function instead of the commented code above
//     renderListWithTemplate(productCardTemplate, this.listElement, list);

//   }

// }
// src/js/ProductList.mjs

import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  // CORRECCIÓN: Usar product.Images.PrimaryMedium para la lista de productos
  // La propiedad 'Images' es nueva y contiene las diferentes tallas.
  const imageSource = product.Images.PrimaryMedium;

  return `
    <li class='product-card'>
      <a href='../product_pages/index.html?product=${product.Id}'>
        <img src='${imageSource}' alt='${product.Name}'>
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class='product-card__price'>$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // MODIFICACIÓN: Ahora pasamos la categoría a getData para obtener los productos correctos del API
    const list = await this.dataSource.getData(this.category);
    
    // NUEVO: Actualizamos el título de la página para incluir la categoría
    this.updateTitle(this.category);
    
    this.renderList(list);
  }

  // NUEVO: Método auxiliar para cambiar el título del listado
  updateTitle(category) {
    const titleElement = document.querySelector('#product-listing-title');
    if (titleElement) {
        // Formatear la categoría (e.g., 'sleeping-bags' -> 'Sleeping Bags')
        const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
        titleElement.textContent = `Top Products: ${formattedCategory}`;
    }
  }

  renderList(list) {
    // Usando la función de utilidad para renderizar la lista
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}