import axiosInstance from "MyApp/utils/axiosConfig";
import { toast } from "react-toastify";

class infractoresService {
  async getAll({
    limit = 0,
    offset = 0,
    input = undefined,
    estado = undefined,
    fecha = undefined,
    orderBy = "",
    orderDirection = "",
    direccion = ""
  }) {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/api/v1/servicios/infractores",
        {
          params: {
            direccion,
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
  
  async create({ nombre, direccion,fecha }) {
    const body = { nombre, direccion,fecha };
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/v1/servicios/infractores",
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
      estado === 1 ? "Infractor Publicado!" : "Infractor dado de baja";
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8080/api/v1/servicios/infractores/active/${id}`,
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
      throw new Error("error al publicar el infractor");
    }
  }
  async delete({ id }) {
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8080/api/v1/servicios/infractores/delete/${id}`
      );
      toast.success("Infractor eliminado correctamente", {
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
      throw new Error("error al eliminar el infractor");
    }
  }
  async update({ id, nombre,direccion,fecha }) {
    const body = {nombre,direccion,fecha };
    console.log(body)
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8080/api/v1/servicios/infractores/${id}`,
        body,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response)
      return response;
    } catch (e) {
      console.log(e)
      throw new Error("error al insertar los datos en infractores");
    }
  }
  
}
export default new infractoresService();
