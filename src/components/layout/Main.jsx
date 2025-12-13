import React from "react";
import { useLocation } from "react-router-dom";

const Main = ({ children }) => {
  const location = useLocation();
  
  const mainClass = location.pathname === "/fe-diplom" 
    ? "main-content__home-page" 
    : "main-content__wrap d-flex";

  return (
    <main className="main container-fluid">
      <div className="row">
        <div className="col col-lg p-0">
          <div className={mainClass}>{children}</div>
        </div>
      </div>
    </main>
  );
};

export default Main;