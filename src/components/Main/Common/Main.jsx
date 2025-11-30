// Main.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const Main = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/fe-diplom";
  const mainClass = isHomePage ? "main--homepage" : "main--default";

  return (
    <main className={`main ${mainClass}`}>
      <div className="main__content">
        {children}
      </div>
    </main>
  );
};

export default Main;