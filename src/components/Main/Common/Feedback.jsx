// FeedBack.jsx
import React from "react";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import Review from "../../Molecules/Molecules/Moleculescomponent";
import "pure-react-carousel/dist/react-carousel.es.css";

const FeedBack = () => {
  const reviews = Array(5).fill(null);

  return (
    <section className="feedback-section" id="feedback">
      <h2 className="feedback__title">Отзывы</h2>
      <CarouselProvider
        naturalSlideWidth={60}
        naturalSlideHeight={45}
        totalSlides={reviews.length}
        visibleSlides={1}
      >
        <Slider className="feedback__slider">
          {reviews.map((_, index) => (
            <Slide key={index} index={index} className="feedback__slide">
              <Review />
            </Slide>
          ))}
        </Slider>
        <DotGroup className="feedback__dots" />
      </CarouselProvider>
    </section>
  );
};

export default FeedBack;