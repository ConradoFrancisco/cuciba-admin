import axiosInstance from "MyApp/utils/axiosConfig";
import { toast } from "react-toastify";

class inmobiliariasIlegalesService {
  async getAll({
    limit = 0,
    offset = 0,
    input = undefined,
    estado = undefined,
    fecha = undefined,
    orderBy = "",
    orderDirection = "",
  }) {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/servicios/inmobiliarias-penal",
        {
          params: {
            fecha,
            input,
            estado,
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
        "error al obtener las inmobiliarias ilegales, intente nuevamente mas tarde"
      );
    }
  }
  async getAllNoCausa({
    limit = 0,
    offset = 0,
    input = undefined,
    estado = undefined,
    fecha = undefined,
    orderBy = "",
    orderDirection = "",
  }) {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/servicios/inmobiliarias-penal/no-causa",
        {
          params: {
            fecha,
            input,
            estado,
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
        "error al obtener las inmobiliarias ilegales, intente nuevamente mas tarde"
      );
    }
  }
  async create({ nombre, direccion,fecha,causa }) {
    const body = { nombre, direccion,fecha,causa };
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/servicios/inmobiliarias-penal",
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
      estado === 1 ? "Inmobiliaria ilegal Publicada!" : "Inmobiliaria ilegal dada de baja";
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8080/servicios/inmobiliarias-penal/${id}`,
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
      const response = await axiosInstance.delete(
        `http://localhost:8080/servicios/inmobiliarias-penal/${id}`
      );
      toast.success("Inmobiliaria ilegal eliminada correctamente", {
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
  async update({ id, nombre,direccion,fecha }) {
    const body = {nombre,direccion,fecha };
    console.log(body)
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8080/servicios/inmobiliarias-penal/modificar/${id}`,
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
  async updateNoCausa({ id, nombre,direccion,fecha }) {
    const body = {nombre,direccion,fecha };
    console.log(body)
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8080/servicios/inmobiliarias-penal/no-causa/modificar/${id}`,
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
export default new inmobiliariasIlegalesService();
