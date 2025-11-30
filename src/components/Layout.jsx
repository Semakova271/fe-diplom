import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Common/Main";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <React.Fragment>
      <Header />

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </React.Fragment>
  );
};
export default Layout;
/**<Outlet /> - место для вложенных роутов> */
