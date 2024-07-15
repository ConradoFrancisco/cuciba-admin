
import axiosInstance from "MyApp/utils/axiosConfig";
import { toast } from "react-toastify";

class RevistaCucicbaService {
  async getAll({
    limit = 0,
    offset = 0,
    input = undefined,
    estado = undefined,
    orderBy = "",
    orderDirection = "",
  }) {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/api/v1/servicios/revista",
        {
          params: {
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

  async create({ fecha,descripcion,archivo,imagen}) {
    const body = {fecha,descripcion,archivo,imagen };
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/v1/servicios/revista",
        body,
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Revista creada correctamente", {
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
      throw new Error("error al insertar los datos en personal");
    }
  }
  async setActive({ id, estado }) {
    const body = { estado };
    const area =
      estado === true ? "Revista Publicada!" : "Revista dada de baja";
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8080/api/v1/servicios/revista/active/${id}`,
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
        `http://localhost:8080/api/v1/servicios/revista/delete/${id}`
      );
      toast.success("Revista eliminada correctamente", {
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
        `http://localhost:8080/servicios/revista-cucicba/modificar/${id}`,
        body,
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Revista modificada correctamente", {
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
      throw new Error("error al insertar los datos en infractores");
    }
  }
}
export default new RevistaCucicbaService();

