import axiosInstance from "MyApp/utils/axiosConfig";
import { toast } from "react-toastify";

class AreaService {
  async getAll() {
    try {
      const response = axiosInstance.get("http://localhost:8080/areas");
      return response;
    } catch (e) {
      throw new Error("hubo un error al obtener los datos");
    }
  }

  async create({ title, orden }) {
    const body = { title, orden };
    console.log(body)
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/areas",
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
  async setActive({ id,estado }) {
    const body = { estado };
    const area = estado === 1 ? 'Área publicada correctamente' : 'Área ahora inactiva'
    try {
      const response = await axiosInstance.patch(`http://localhost:8080/areas/${id}`,body)
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
      throw new Error("error al publicar el área");
    }
  }
  async delete({ id }) {
    try {
      const response = await axiosInstance.delete(`http://localhost:8080/areas/${id}`)
      toast.success('Área eliminada correctamente', {
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
      throw new Error("error al eliminar el área");
    }
  }
}
const AreasInstance = new AreaService();

export default AreasInstance;
