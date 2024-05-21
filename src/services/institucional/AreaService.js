import axiosInstance from "MyApp/utils/axiosConfig";

class AreaService {
  async getAll() {
    try {
      const response = axiosInstance.get("http://localhost:8080/areas");
      return response;
    } catch (e) {
      throw new Error("hubo un error al obtener los datos");
    }
  }
}
const AreasInstance = new AreaService();

export default AreasInstance;
