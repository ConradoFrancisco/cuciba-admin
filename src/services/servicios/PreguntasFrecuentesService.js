import axiosInstance from "MyApp/utils/axiosConfig";
import { toast } from "react-toastify";

class PreguntasFrecuentesService {
  async getAll({
    limit = 0,
    offset = 0,
    input = undefined,
    estado = undefined,
    orden = undefined,
    categoria = undefined,
    orderBy = "",
    orderDirection = "",
  }) {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/api/v1/servicios/preguntas-frecuentes",
        {
          params: {
            categoria,
            input,
            estado,
            orden,
            limit,
            offset,
            orderDirection,
            orderBy,
          },
        }
      );
      console.log(response);
      return response;
    } catch (e) {
      throw new Error(
        "error al obtener las preguntas Frecuentes, intente nuevamente mas tarde"
      );
    }
  }
  async getCategorys(){
    try {
        const response = await axiosInstance.get(
          "http://localhost:8080/api/v1/servicios/preguntas-frecuentes/categorias",
          );
        console.log(response);
        return response;
      } catch (e) {
        throw new Error(
          "error al obtener las categorias , intente nuevamente mas tarde"
        );
      }
    }
  
  async create({ pregunta,respuesta,categoria }) {
    const body = { pregunta,respuesta,categoria };
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/v1/servicios/preguntas-frecuentes",
        body,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (e) {
      console.log(e);
      throw new Error("error al insertar los datos en preguntas-frecuentes");
    }
  }
  async setActive({ id, estado }) {
    const body = { estado };
    const area =
      estado === 1 ? "Pregunta Publicada con éxito!" : "Pregunta dada de baja";
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8080/api/v1/servicios/preguntas-frecuentes/active/${id}`,
        body
      );
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
      console.log(e);
      throw new Error("error al publicar el área");
    }
  }
  async delete({ id }) {
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8080/api/v1/servicios/preguntas-frecuentes/delete/${id}`
      );
      toast.success("Autoridad eliminada correctamente", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { color: "#fff", fontWeight: "500" }, // Añade un borde al texto}
      });
     
    } catch (e) {
      console.log(e);
      throw new Error("error al eliminar el área");
    }
  }
  async update({ id, pregunta,respuesta,categoria }) {
    const body = { pregunta,respuesta,categoria };
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8080/api/v1/servicios/preguntas-frecuentes/${id}`,
        body,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response)
      return response;
    } catch (e) {
      console.log(e)
      throw new Error("error al insertar los datos en areas");
    }
  }
}
export default new PreguntasFrecuentesService();
