// // wrapper for querySelector...returns matching element
// export function qs(selector, parent = document) {
//   return parent.querySelector(selector);
// }
// // or a more concise version if you are into that sort of thing:
// // export const qs = (selector, parent = document) => parent.querySelector(selector);

// // retrieve data from localstorage
// export function getLocalStorage(key) {
//   return JSON.parse(localStorage.getItem(key));
// }
// // save data to local storage
// export function setLocalStorage(key, data) {
//   localStorage.setItem(key, JSON.stringify(data));
// }
// // set a listener for both touchend and click
// export function setClick(selector, callback) {
//   qs(selector).addEventListener('touchend', (event) => {
//     event.preventDefault();
//     callback();
//   });
//   qs(selector).addEventListener('click', callback);
// }
// // obtiene un parámetro de la URL
// export function getParam(param) {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   return urlParams.get(param);
// }


// // Renders a list of items to the DOM using a template function
// export function renderListWithTemplate(
//   templateFn,
//   parentElement,
//   list,
//   position = 'afterbegin',
//   clear = false
// ) {
//   // 1. Limpiar el contenido si se solicita
//   if (clear) {
//     parentElement.innerHTML = '';
//   }

//   // 2. Transformar la lista de datos a un array de strings HTML
//   // Aquí usamos la sintaxis completa para mayor claridad, aunque list.map(templateFn) también funciona
//   const htmlStrings = list.map((item) => templateFn(item));
  
//   // 3. Insertar el HTML
//   parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
// }
// src/js/utils.mjs

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

// obtiene un parámetro de la URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Renders a list of items to the DOM using a template function
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false
) {
  // 1. Limpiar el contenido si se solicita
  if (clear) {
    parentElement.innerHTML = '';
  }

  // 2. Transformar la lista de datos a un array de strings HTML
  const htmlStrings = list.map((item) => templateFn(item));
  
  // 3. Insertar el HTML
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}


// --- NUEVAS FUNCIONES PARA CARGA DINÁMICA DE PARTIALS (W03) ---

/**
 * Inserta un string de plantilla en un elemento del DOM y ejecuta un callback opcional.
 */
export function renderWithTemplate(template, parentElement, data, callback) {
  // Usar innerHTML para reemplazar el contenido
  parentElement.innerHTML = template; 
  
  // Ejecutar el callback si existe
  if (callback) {
    callback(data);
  }
}

/**
 * Carga el contenido de un archivo HTML (partial) usando Fetch.
 */
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text(); // Leer como texto, no JSON
  return template;
}

/**
 * Carga los partials de header y footer y los inyecta en los elementos del DOM.
 */
export async function loadHeaderFooter() {
  // Rutas absolutas a los partials
  const headerPath = '/partials/header.html'; 
  const footerPath = '/partials/footer.html';

  try {
    // 1. Cargar las plantillas de forma asíncrona
    const headerTemplate = await loadTemplate(headerPath);
    const footerTemplate = await loadTemplate(footerPath);

    // 2. Obtener los elementos placeholder del DOM
    const headerElement = qs('#main-header');
    const footerElement = qs('#main-footer');

    // 3. Renderizar e inyectar el contenido
    if (headerElement && footerElement) {
      // Usamos null, ya que el contenido es estático y no requiere data ni callback
      renderWithTemplate(headerTemplate, headerElement);
      renderWithTemplate(footerTemplate, footerElement);
    } else {
      console.error('Elementos #main-header o #main-footer no encontrados en el DOM. Asegúrate de que los IDs estén en el HTML.');
    }
  } catch (error) {
    console.error('Error al cargar partials:', error);
  }
}