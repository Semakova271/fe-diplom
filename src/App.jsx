import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "/src/components/layout/Layout.jsx";
import HomePage from "/src/components/layout/Home/HomePage.jsx";
import TrainsPage from "/src/components/pages/TrainsPage.jsx";
import SelectionWagons from "/src/components/pages/SelectionWagons.jsx";
import PassengersInfo from "/src/components/pages/PassengersInfo.jsx";
import PersonalData from "/src/components/pages/PersonalData.jsx";
import Screening from "/src/components/pages/Screening.jsx";
import OrderResult from "/src/components/modules/OrderResult/OrderResult.jsx";
import NotFound from "/src/components/pages/NotFound.jsx";
import "./App.css";

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