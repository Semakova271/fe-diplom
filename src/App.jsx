import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout.jsx";
import HomePage from "./components/layout/Home/HomePage.jsx";
import TrainsPage from "./components/pages/TrainsPage.jsx";
import SelectionWagons from "./components/pages/SelectionWagons.jsx";  // С заглавной S
import PassengersInfo from "./components/pages/PassengersInfo.jsx";    // С заглавной P
import PersonalData from "./components/pages/PersonalData.jsx";        // С заглавной P
import Screening from "./components/pages/Screening.jsx";
import OrderResult from "./components/modules/OrderResult/OrderResult.jsx";
import NotFound from "./components/pages/NotFound.jsx";
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