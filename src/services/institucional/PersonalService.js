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
  async getAll(limit, offset) {
    return new Promise((resolve, reject) => {
      if (true) {
        const data = personalData;
        const statusCode = 200;
        resolve({ data, statusCode });
      } else {
        reject(new Error("Error al obtener El personal del colegio"));
      }
    });
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
