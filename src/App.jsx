import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./components/Pages/HomePage";
import SelectionTrain from "./components/Pages/SelectionTrain";
import SelectionWagons from "./components/Pages/SelectionWagons";
import PassengersInfo from "./components/Pages/PassengersInfo";
import PersonalData from "./components/Pages/PersonalData";
import Screening from "./components/Pages/Screening";
import OrderResult from "./components/Pages/OrderResult";
import NotFound from "./components/Pages/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/fe-diplom/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="trains/" element={<SelectionTrain />} />
          <Route path="seats/:id" element={<SelectionWagons />} />
          <Route path="passengers/:id/" element={<PassengersInfo />} />
          <Route path="personal_information/:id/" element={<PersonalData />} />
          <Route path="screening/:id/" element={<Screening />} />
          <Route path="order-result/:id/" element={<OrderResult/>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;