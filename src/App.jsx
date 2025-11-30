import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./components/Pages/Pages";
import SelectionTrain from "./components/Pages/Pages";
import SelectionWagons from "./components/Pages/Pages";
import PassengersInfo from "./components/Pages/Pages";
import PersonalData from "./components/Pages/Pages";
import Screening from "./components/Pages/Pages";
import OrderResult from "./components/Pages/Pages";
import NotFound from "./components/Pages/Pages";
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