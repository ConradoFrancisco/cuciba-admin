import axiosInstance from "MyApp/utils/axiosConfig";
import { toast } from "react-toastify";

const { personalData } = require("MyApp/mocks/personalPorAreasMock");
function findWorkerById(id) {
  for (const area of personalData) {
    for (const worker of area.workers) {
      if (worker.id === id) {
        return worker;
      }
    }
  }
  return null; // Retorna null si no se encuentra ningún trabajador con el ID dado
}
class PersonalService {
  async getAll({ limit = 0, offset = 0, input = undefined,estado=undefined,area=undefined,orderBy="",orderDirection="" }) {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/api/v1/institucional/personal",
        {
          params: {
            input,
            estado,
            area,
            limit,
            offset,
            orderDirection,
            orderBy
          },
        }
      );
      console.log(response);
      return response;
    } catch (e) {
      throw new Error(
        "error al obtener el personal, intente nuevamente mas tarde"
      );
    }
  }
  async getSingleWorker(id) {
    return new Promise((resolve, reject) => {
      if (true) {
        console.log(id);
        const data = findWorkerById(id);
        console.log(data);
        const statusCode = 200;
        resolve({ data, statusCode });
      } else {
        reject(new Error("error al obtener el trabajador"));
      }
    });
  }
  async create({ nombre, apellido, telefono, email, posicion, area }) {
    const body = { nombre, apellido, telefono, email, posicion, area };
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/v1/institucional/personal",
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
    const personal = estado === 1 ? 'Personal dado de alta!' : 'Personal inactivo'
    try {
      const response = await axiosInstance.patch(`http://localhost:8080/api/v1/institucional/personal/active/${id}`, body)
      toast.success(personal, {
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
      const response = await axiosInstance.patch(`http://localhost:8080/api/v1/institucional/personal/delete/${id}`)
      toast.success('Personal eliminado correctamente', {
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
      throw new Error("error al eliminar el personal");
    }
  }
  async update({id, nombre, apellido, telefono, email, posicion, area }) {
    const body = {id, nombre, apellido, telefono, email, posicion, area };
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8080/api/v1/institucional/personal/${id}`,
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
const PersonalInstance = new PersonalService();

export default PersonalInstance;
