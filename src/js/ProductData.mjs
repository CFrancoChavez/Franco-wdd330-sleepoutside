// function convertToJson(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error('Bad Response');
//   }
// }

// export default class ProductData {
//   constructor(category) {
//     this.category = category;
//     this.path = `..public/json/${this.category}.json`;
//   }
//   getData() {
//     return fetch(this.path)
//       .then(convertToJson)
//       .then((data) => data);
//   }
//   async findProductById(id) {
//     const products = await this.getData();
//     return products.find((item) => item.Id === id);
//   }
// }

const baseURL = import.meta.env.VITE_SERVER_URL; // Access the environment variable
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  // constructor(category) {
  //   this.category = category;
  //   this.path = `/json/${this.category}.json`;
  // }
      constructor() {

      }
  // getData() {
  //   return fetch(this.path)
  //     .then(convertToJson)
  //     .then((data) => data);
  // }
   async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    
    // El API retorna los productos dentro de la propiedad 'Result'
    return data.Result; 
  }
  // async findProductById(id) {
  //   const products = await this.getData();
  //   return products.find((item) => item.Id === id);
  // }
     // NUEVO MÉTODO: Para obtener un solo producto por ID (necesario para la página de detalle)
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    
    // El API retorna un array, tomamos el primer elemento [0]
    return data.Result[0]; 
  }
}