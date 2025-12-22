import React from "react";
import MainForm from "../Forms/MainForm";
import About from "../ui/About";
import HowItWorks from "../ui/HowItWorks";
import FeedBack from "../ui/FeedBack";
import Banner from "../ui/Banner";
import banner1 from "../../img/banner1.png";
import "./HomePage.css";

const HomePage = () => {
  return (
    <React.Fragment>
      <div className="banner-container">
        <Banner className="banner banner-home" banner={banner1} />
        <div className="form-overlay">
          <MainForm className="homepage_form" />
        </div>
      </div>
      <About />
      <HowItWorks />
      <FeedBack />
    </React.Fragment>
  );
};

export default HomePage;