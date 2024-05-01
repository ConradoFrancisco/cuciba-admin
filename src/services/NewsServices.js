import { data } from "../MyApp/mocks/NewsMock";

class NewsService {
  async getAll(offset, limit) {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        if (true) {
          // Logica para el pedido a la db
          const response = {
            results: data,
            length: 2,
            statusCode: 200,
          };
          resolve(response);
        } else {
          reject(new Error("no se ha podido cumplir la promesa"));
        }

      },2000)
    });
  }
  async create(title) {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        if (true) {
          // Logica para el pedido a la db
          data.unshift({ id: data.length + 1, titulo: title,estado:'Sin publicar'});
          console.log(data)
          const response = {
            results: data,
            length: 2,
            statusCode: 200,
          };
          resolve(response);
        } else {
          reject(new Error("no se ha podido cumplir la promesa"));
        }

      },2000)
    });
  }
}

export const NewsInstance = new NewsService();
