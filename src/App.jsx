import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import HomePage from "src/components/pages/HomePage";
import SelectionTrain from "./components/pages/SelectionTrain";
import SelectionWagons from "./components/pages/SelectionWagons";
import PassengersInfo from "./components/pages/PassengersInfo";
import PersonalData from "./components/pages/PersonalData";
import Screening from "./components/pages/Screening";
import OrderResult from "./components/pages/OrderResult";
import NotFound from "./components/pages/NotFound";
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
          <Route path="order-result/:id/" element={<OrderResult />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;