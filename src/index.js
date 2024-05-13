import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import "helpers/initFA";
import MyApp from "MyApp/MyApp";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "MyApp/context/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Main>
        <MyApp />
        <ToastContainer />
      </Main>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("main")
);
