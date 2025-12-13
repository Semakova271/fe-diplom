import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Все компоненты в одном файле
const Layout = ({ children }) => <div className="layout">{children}</div>;
const HomePage = () => <div className="home">Home Page</div>;
const TrainsPage = () => <div className="trains">Trains Page</div>;
const SelectionWagons = () => <div className="wagons">Selection Wagons</div>;
const PassengersInfo = () => <div className="passengers">Passengers Info</div>;
const PersonalData = () => <div className="personal">Personal Data</div>;
const Screening = () => <div className="screening">Screening</div>;
const OrderResult = () => <div className="order">Order Result</div>;
const NotFound = () => <div className="not-found">404 - Page Not Found</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/fe-diplom/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="trains/" element={<TrainsPage />} />
          <Route path="seats/:id" element={<SelectionWagons />} />
          <Route path="passengers/:id/" element={<PassengersInfo />} />
          <Route path="personal_information/:id/" element={<PersonalData />} />
          <Route path="screening/:id/" element={<Screening />} />
          <Route path="order-result/:id/" element={<OrderResult />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;