import React, { useEffect } from "react";
import MainForm from "./MainForm.jsx"; 
import About from "./About.jsx";
import HowItWorks from "./HowItWorks.jsx";
import FeedBack from "./FeedBack.jsx";
import Banner from "../../common/Banner.jsx"; 
import banner1 from "../../../img/banner1.png";
import "./HomePage.css"; 

const HomePage = () => {
  useEffect(() => {
    console.log('Доменная страница загружена');
    const form = document.querySelector('.homepage_form');
    if (form) {
      form.style.opacity = '1';
      form.style.visibility = 'visible';
      form.style.display = 'block';
    }
  }, []);

  return (
    <React.Fragment>
      <section className="home-banner-section">
        <Banner className="banner banner-home" banner={banner1} />
        
        {/* Контейнер для заголовка и формы */}
        <div className="banner-content">
          <h1 className="banner_title">
            Вся жизнь - <strong>путешествие!</strong>
          </h1>
          <MainForm className="homepage_form" />
        </div>
      </section>
      <About />
      <HowItWorks />
      <FeedBack />
    </React.Fragment>
  );
};

export default HomePage;