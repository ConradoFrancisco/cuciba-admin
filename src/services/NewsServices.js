import { toast } from "react-toastify";
import { data } from "../MyApp/mocks/NewsMock";
import axiosInstance from "../MyApp/utils/axiosConfig";

class NewsService {
  async getAll({ offset = 0, limit }) {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/noticias"
      );
      return response;
    } catch (e) {
      toast.danger("error al obtener las noticias", {
        position: "bottom-right",
      });
    }
  }
  async getByid({id}) {
    try{
      const response = await axiosInstance.get(`http://localhost:8080/noticias/${id}`)
      return response.data
      
    }catch(e){
      throw new Error ("error al conseguir la noticia");
    }
  }
  async create({ date, title, description, body, orden }) {
    const cuerpo = { date, title, description, body, orden };
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/noticias",
        cuerpo,
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Noticia agregada correctamente", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { color: "#fff", fontWeight: "500" }, // Añade un borde al texto}
      });
      return response;
    } catch (e) {
      throw new Error("error al intentar publicar la noticia");
    }
  }
  async uploadImagesUrl({ id, files }) {
    const cuerpo = { id, files };
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/noticias/images/",
        cuerpo,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      return response;
    } catch (e) {
      throw new Error("error al intentar publicar la noticia");
    }
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
  async setActive({ id, estado }) {
    const body = { estado };
    const area = estado === 1 ? 'Noticia Publicada satisfatoriamente' : 'Noticia pausada satisfactoriamente'
    try {
      const response = await axiosInstance.patch(`http://localhost:8080/noticias/${id}`, body)
      toast.success(area, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { color: "#fff", fontWeight: "500" }, // Añade un borde al texto}
      });
      return response;
    } catch (e) {
      console.log(e)
      throw new Error("error al publicar la noticia");
    }
  }
  async pausar(id) {
    return new Promise((resolve, reject) => {
      if (true) {
        const index = data.findIndex((noticia) => noticia.id === id);

        if (index !== -1) {
          let newData = [...data];
          newData[index].estado = "no publicada";
          console.log(newData[index]);

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
}

export const NewsInstance = new NewsService();
