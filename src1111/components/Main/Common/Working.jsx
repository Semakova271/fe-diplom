// HowItWorks.jsx
import React, { useState } from "react";
import Modal from "../../Molecules/Molecules/Moleculescomponent"
import ic_subtract from "../../../img/ic_subtract.svg";
import ic_house from "../../../img/ic_house.svg";
import ic_globe from "../../../img/ic_globe.svg";

const HowItWorks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const features = [
    {
      icon: ic_subtract,
      title: "Удобный заказ на сайте"
    },
    {
      icon: ic_house,
      title: "Нет необходимости ехать в офис"
    },
    {
      icon: ic_globe,
      title: "Огромный выбор направлений"
    }
  ];

  return (
    <>
      <section className="how-it-works-section" id="howItWorks">
        {isModalOpen && <Modal type="info" onClose={toggleModal} />}
        
        <div className="how-it-works__header">
          <h2 className="how-it-works__title">Как это работает</h2>
          <button className="how-it-works__btn" onClick={toggleModal}>
            Узнать больше
          </button>
        </div>

        <div className="how-it-works__features">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-card__icon">
                <img src={feature.icon} alt={feature.title} />
              </div>
              <h5 className="feature-card__title">{feature.title}</h5>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HowItWorks;