import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Создаем компоненты прямо в App.jsx
const Layout = ({ children }) => <div>{children}</div>;
const HomePage = () => <div>Home Page</div>;
const TrainsPage = () => <div>Trains Page</div>;
const SelectionWagons = () => <div>Selection Wagons</div>;
const PassengersInfo = () => <div>Passengers Info</div>;
const PersonalData = () => <div>Personal Data</div>;
const Screening = () => <div>Screening</div>;
const OrderResult = () => <div>Order Result</div>;
const NotFound = () => <div>404 - Not Found</div>;

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