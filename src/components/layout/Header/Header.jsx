import React from "react";
import NavBar from "./NavBar";
import Logo from "./Logo";
import "./header.css";
import { nanoid } from "nanoid";

const Header = () => {

  return (
    <React.Fragment>
      <header className="container-fluid header">
        <div className="row">
          <div className="col col-md">
            <div className="header-top">
              <Logo key={nanoid()} />
            </div>
            <NavBar key={nanoid()} />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
