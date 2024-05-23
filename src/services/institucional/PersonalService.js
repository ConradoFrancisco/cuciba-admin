import axiosInstance from "MyApp/utils/axiosConfig";

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
  async getAll({ limit = 0, offset = 0 }) {
    try {
      const response = await axiosInstance.get('http://localhost:8080/personal', {
        params: {
          limit, offset
        }
      })
      console.log(response)
      return response
    } catch (e) {
      throw new Error("error al obtener el personal, intente nuevamente mas tarde")
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
}
const PersonalInstance = new PersonalService();

export default PersonalInstance;
