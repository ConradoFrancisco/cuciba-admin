import React from "react";
import { Outlet } from "react-router-dom";

const MyAuthLayout = () => {
  return (
    <>
      <section className="container-fluid" style={{ padding: "0" }}>
        <div className="vh-100 row" >
          <div
            className="col-6"
            style={{
              backgroundColor: "black",
              backgroundImage:
                "url(https://images.unsplash.com/photo-1690636169128-34a4a1bce684?q=80&w=1070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
              backgroundPosition: "50% 20%",
            }}
          ></div>
          <div className="col-6">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAuthLayout;
