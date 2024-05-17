const { Areas } = require("MyApp/mocks/areasMock");

class AreaService {
  async getAll() {
    return new Promise((resolve, reject) => {
      if (true) {
        const data = Areas;
        const statusCode = 200;
        resolve({ data, statusCode });
      } else {
        reject(new Error("no se pudieron obtener las areas"));
      }
    });
  }
}
const AreasInstance = new AreaService();

export default AreasInstance;
