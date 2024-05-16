import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext({ user: null, setUser: () => {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Intentar obtener el usuario del localStorage cuando se monta el componente
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      // Guardar el usuario en localStorage cuando cambie el estado del usuario
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // Eliminar el usuario del localStorage si no hay usuario
      localStorage.removeItem("user");
    }
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
