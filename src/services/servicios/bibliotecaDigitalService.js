const { publicaciones } = require("MyApp/mocks/serviciosMock");

class BibliotecaService {
  async getAll() {
    return new Promise((resolve, reject) => {
      if (true) {
        const data = publicaciones;
        resolve({ data: data });
      } else {
        reject(new Error("error al obtener los datos"));
      }
    });
  }
}
const bibliotecaInstance = new BibliotecaService();
export default bibliotecaInstance;
