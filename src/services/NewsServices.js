import { data } from "../MyApp/mocks/NewsMock";

class NewsService {
  async getAll({ offset = 0, limit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (true) {
          // Logica para el pedido a la db
          if (limit) {
            const mappedData = data
              .map(({ id, title, estado, imageUrl }) => ({
                id,
                title,
                estado,
                imageUrl,
              }))
              .slice(offset, offset + limit);
            console.log(mappedData);
            const response = {
              results: mappedData,
              length: mappedData.length,
              totalResults: data.length,
              statusCode: 200,
            };
            console.log(response);
            resolve(response);
          } else {
            const mappedData = data
              .map(({ id, title, estado, imageUrl }) => ({
                id,
                title,
                estado,
                imageUrl,
              }))
              .slice();
            console.log(mappedData);
            const response = {
              results: mappedData,
              length: mappedData.length,
              totalResults: data.length,
              statusCode: 200,
            };
            console.log(response);

            resolve(response);
          }
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
            estado: "no publicada",
            imageUrl:
              "https://img.freepik.com/vector-premium/imagen-miniatura-predeterminada-icono-imagen-grafico-pictograma-plano-simple-no-disponible-foto-faltante_101884-2515.jpg?w=826",
            date: "",
            description: "",
            cantFotos: "",
            body: "",
            images: [],
            quote: "",
            tags: [],
          });

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
  async edit(id, portada, title, category, content, tags, images, edited) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (true) {
          const noticia = data.filter((noticia) => noticia.id === id);
          noticia[0].tags = tags;
          noticia[0].imageUrl = portada;
          noticia[0].title = title;
          noticia[0].body = content;
          noticia[0].category = category;
          noticia[0].images = images;
          noticia[0].cantFotos = images.length;
          noticia[0].edited = edited;
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
  async delete(id) {
    return new Promise((resolve, reject) => {
      if (true) {
        const newData = data.filter((noticia) => noticia.id !== parseInt(id));
        console.log(newData);
        const response = {
          data: newData,
          statusCode: 200,
        };

        resolve(response);
      } else {
        reject(new Error("no se ha podido cumplir la promesa"));
      }
    });
  }
  async publicar(id) {
    return new Promise((resolve, reject) => {
      if (true) {
        const index = data.findIndex((noticia) => noticia.id === id);
        if (index !== -1) {
          let newData = [...data]; // Clona el array 'data'
          newData[index].estado = "publicada"; // Actualiza el estado de la noticia encontrada
          console.log(newData[index]);
          //let newData = [...data]; // Clona el array 'data'
          //console.log(newData[id + 1].estado);
          //newData[id - 1].estado = "publicada";
          //console.log(newData[id + 1].estado);
          //console.log(newData);

          const response = {
            data: newData,
            statusCode: 200,
          };
          resolve(response);
        }
      } else {
        reject(new Error("no se ha podido cumplir la promesa"));
      }
    });
  }
  async pausar(id) {
    return new Promise((resolve, reject) => {
      if (true) {
        let newData = [...data]; // Clona el array 'data'
        //console.log(newData[id + 1].estado);
        newData[id - 1].estado = "no publicada";
        //console.log(newData[id + 1].estado);
        //console.log(newData);

        const response = {
          data: newData,
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
