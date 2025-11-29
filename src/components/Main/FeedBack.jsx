import React from "react";
import Review from "../Molecules/Review";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const FeedBack = () => {
  return (
    <React.Fragment>
      <section className="feedback" id="feedback">
        <h2 className="feedback__title">Отзывы</h2>

        <Carousel />
      </section>
    </React.Fragment>
  );
};

export default FeedBack;

const Carousel = () => {
  return (
    <CarouselProvider
      naturalSlideWidth={60}
      naturalSlideHeight={45}
      totalSlides={5}
      visibleSlides={1}
    >
      <Slider>
        {[...Array(5).keys()].map((item) => {
          return (
            <Slide key={item} index={item} className="carousel-item">
              <Review />
            </Slide>
          );
        })}
      </Slider>
      <DotGroup className="custom_dot-group"></DotGroup>
    </CarouselProvider>
  );
};