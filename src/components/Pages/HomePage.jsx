import React from "react";
import MainForm from "../Forms/MainForm";
import About from "../Main/About";
import HowItWorks from "../Main/HowItWorks";
import FeedBack from "../Main/FeedBack";
import Banner from "../Molecules/Banner";
import banner1 from "../../img/banner/banner1.png";

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