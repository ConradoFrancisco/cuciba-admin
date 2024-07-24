import axiosInstance from "MyApp/utils/axiosConfig";
import { toast } from "react-toastify";

class PersonalService {
  async getAll({
    limit = 0,
    offset = 0,
    input = undefined,
    estado = undefined,
    orden = undefined,
    puesto = undefined,
    periodo = undefined,
    orderBy = "",
    orderDirection = "",
  }) {
    try {
      
      const control_estado = estado >= 0 ? estado : null;
      const response = await axiosInstance.get(
        "http://localhost:8080/api/v1/institucional/autoridad",
        {
          params: {
            puesto,
            input,
            estado : control_estado,
            orden,
            limit,
            offset,
            orderDirection,
            orderBy,
            periodo
          },
        }
      );
      console.log(response);
      return response;
    } catch (e) {
      throw new Error(
        "error al obtener las autoridades, intente nuevamente mas tarde"
      );
    }
  }
  async create({ nombre, apellido, foto, cargoid, orden,periodo }) {
    const body = { nombre, apellido, foto, cargoid, orden,periodo };
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/v1/institucional/autoridad",
        body,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (e) {
      console.log(e);
      throw new Error("error al insertar los datos en personal");
    }
  }
  async setActive({ id, estado }) {
    const body = { estado };
    const area =
      estado === 1 ? "Autoridad dada de alta!" : "Autoridad ahora inactiva";
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8080/api/v1/institucional/autoridad/active/${id}`,
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
        `http://localhost:8080/api/v1/institucional/autoridad/delete/${id}`
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
      return response;
    } catch (e) {
      console.log(e);
      throw new Error("error al eliminar el área");
    }
  }
  async update( { id,nombre, apellido, foto, cargoid, orden, periodo}) {
    const body = { id,nombre, apellido, foto, cargoid, orden, periodo };
    console.log(body)
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8080/api/v1/institucional/autoridad/${id}`,
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
export default new PersonalService();
