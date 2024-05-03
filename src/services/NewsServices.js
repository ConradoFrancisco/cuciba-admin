import { data } from "../MyApp/mocks/NewsMock";

class NewsService {
  async getAll(offset, limit) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (true) {
          // Logica para el pedido a la db
          const mappedData = data.map(({ id, title, estado }) => ({
            id,
            title,
            estado,
          }));
          console.log(mappedData);
          const response = {
            results: mappedData,
            length: mappedData.length,
            statusCode: 200,
          };
          resolve(response);
        } else {
          reject(new Error("no se ha podido cumplir la promesa"));
        }
      }, 2000);
    });
  }
  async getUnique(id) {
    return new Promise((resolve, reject) => {
      if (true) {
        // Logica para el pedido a la db
        const noticia = data.filter((noticia) => noticia.id === id);
        const response = {
          results: noticia,
          statusCode: 200,
        };
        console.log(response);
        resolve(response);
      } else {
        reject(new Error("no se ha podido cumplir la promesa"));
      }
    });
  }
  async create(title) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (true) {
          // Logica para el pedido a la db
          data.unshift({
            id: data.length + 1,
            title: title,
            estado: "Sin publicar",
            imageUrl: "",
            date: "",
            description: "",
            cantFotos: "",
            body: "",
            images: [],
            quote: "",
          });
          console.log(data);
          const response = {
            results: data,
            length: 2,
            statusCode: 200,
          };
          resolve(response);
        } else {
          reject(new Error("no se ha podido cumplir la promesa"));
        }
      }, 2000);
    });
  }
  async edit(id, category, content, tags, images) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (true) {
          const noticia = data.filter((noticia) => noticia.id === id);
          noticia[0].tags = tags;
          noticia[0].body = content;
          noticia[0].category = category;
          noticia[0].images = images;
          noticia[0].cantFotos = images.length;

          const response = {
            noticia: noticia[0],
            statusCode: 200,
          };
          resolve(response);
        } else {
          reject(new Error("no se ha podido cumplir la promesa"));
        }
      }, 2000);
    });
  }
}

export const NewsInstance = new NewsService();
