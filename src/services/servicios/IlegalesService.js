const { ilegalesPenal } = require("MyApp/mocks/serviciosMock")

class IlegalesService{
    async getAll(){
        return new Promise((resolve,reject)=>{
            if(true){
                const data = ilegalesPenal
                const statusCode = 200;
                resolve({data,statusCode})
            }else{
                reject(new Error("Huno un error al obtener los datos"))
            }
        })
    }
}

const IlegalesInstance = new IlegalesService();

export default IlegalesInstance;