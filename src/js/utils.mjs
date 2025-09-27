// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

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
  // Aquí usamos la sintaxis completa para mayor claridad, aunque list.map(templateFn) también funciona
  const htmlStrings = list.map((item) => templateFn(item));
  
  // 3. Insertar el HTML
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}