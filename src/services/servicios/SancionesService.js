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
    categoria= undefined,
    orderBy = "",
    orderDirection = "",
  }) {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/api/v1/servicios/sanciones",
        {
          params: {
            categoria,
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
        "error al obtener las sanciones, intente nuevamente mas tarde"
      );
    }
  }
  async create({ descripcion,created_at,archivo,categoria }) {
    const body = { descripcion,created_at,archivo,categoria };
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/v1/servicios/sanciones",
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
      estado === 1 ? "sancion del tribunal publicada!" : "sancion del tribunal pausada";
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8080/servicios/sanciones/${id}`,
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
      throw new Error("error al activar/desactivar la sancion");
    }
  }
  async delete({ id }) {
    try {
      const response = await axiosInstance.delete(
        `http://localhost:8080/servicios/sanciones/${id}`
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
  async update({ id, descripcion,created_at,archivo,categoria }) {
    const body = { descripcion,created_at,archivo,categoria };
    console.log(body)
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8080/servicios/sanciones/modificar/${id}`,
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
