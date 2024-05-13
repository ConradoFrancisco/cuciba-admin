import React from "react";
import { Outlet } from "react-router-dom";

const MyAuthLayout = () => {
  return (
    <>
      <section className="container-fluid" style={{ padding: "0" }}>
        <div className="vh-100 row">
          <div
            className="col-6"
            style={{
              backgroundColor: "black",
              backgroundImage:
                "url(https://cucicba.org.ar/static/media/bg.779caac3.jpg)",
              backgroundPosition: "50% 20%",
            }}
          ></div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAuthLayout;
