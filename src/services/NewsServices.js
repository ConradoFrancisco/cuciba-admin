import { data } from "../MyApp/mocks/NewsMock";

class NewsService {
  async getAll(offset, limit) {
    return new Promise((resolve, reject) => {
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
    });
  }
  async create(title) {
    return new Promise((resolve, reject) => {
      if (true) {
        // Logica para el pedido a la db
        data.push({ id: data.length + 1, titulo: title });
        const response = {
          results: data,
          length: 2,
          statusCode: 200,
        };
        resolve(response);
      } else {
        reject(new Error("no se ha podido cumplir la promesa"));
      }
    });
  }
}

export const NewsInstance = new NewsService();
