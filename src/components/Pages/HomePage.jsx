import React from "react";
import MainForm from "../forms/MainForm";
import About from "../modules/Home/About";
import HowItWorks from "../modules/Home/HowItWorks";
import FeedBack from "../modules/Home/FeedBack";
import Banner from "../commom/Banner";
import banner1 from "../../img/banner1.png";

const HomePage = () => {
  return (
    <React.Fragment>
      <Banner className="banner banner-home" banner={banner1}>

      </Banner>
      <MainForm className="homepage_form" />
      <About />
    
      <HowItWorks />

      <FeedBack />
    </React.Fragment>
  );
};

export default HomePage;