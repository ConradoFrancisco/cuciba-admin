class UserService {
  constructor(service) {
    this.service = "";
  }

  GetUsers(limit = 0, offset = 0) {
    return new Promise(function (resolve, reject) {
      resolve([
        {
          id: 1,
          name: "Anna",
          email: "anna@example.com",
          phone: 113214971,
          created_at: "2021-01-01",
          sucursal: "Sucursal 1",
          role: "Administrador",
          status: "Activo",
        },
        {
          id: 2,
          name: "Jose",
          email: "jose@example.com",
          phone: 113214972,
          created_at: "2021-01-01",
          sucursal: "Sucursal 2",
          role: "Administrador",
          status: "Activo",
        },
      ]);

      reject(
        new Error(
          "Ocurrió un error al querer obtener el listado de usuarios. Contactese con el administrador del Sitio."
        )
      );
    });
  }

  GetDefaultUser() {
    return new Promise(function (resolve, reject) {
      resolve({
        id: 1,
        name: "Anna",
        email: "anna@example.com",
        phone: 113214971,
        created_at: "2021-01-01",
        sucursal: "Sucursal 1",
        role: "Administrador",
        status: "Activo",
      });
      reject(
        new Error(
          "Ocurrió un error al querer obtener el listado de usuarios. Contactese con el administrador del Sitio."
        )
      );
    });
  }

  GetUser(email, password) {
    return new Promise((resolve, reject) => {
      const user = {
        id: 1,
        name: "Anna",
        email: "aspirante@uno.com",
        phone: 113214971,
        created_at: "2021-01-01",
        sucursal: "Sucursal 1",
        role: "Administrador",
        status: "Activo",
      };
      const statusCode = 200;
      if (user.email === email) {
        resolve({ user, statusCode });
      } else {
        reject(new Error("ocurrió un error al iniciar sesión"));
      }
    });
  }

  UpdateUser() {}

  DisableUser() {}

  EnableUser() {}

  DeleteUser() {}
}

export default new UserService();
