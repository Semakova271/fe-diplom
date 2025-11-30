import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { 
  HomePage, 
  SelectionTrain, 
  SelectionWagons, 
  PassengersInfo, 
  PersonalData, 
  Screening, 
  OrderResult, 
  NotFound 
} from './components/Pages/Pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="trains" element={<SelectionTrain />} />
        <Route path="seats/:id" element={<SelectionWagons />} />
        <Route path="passengers/:id" element={<PassengersInfo />} />
        <Route path="personal_information/:id" element={<PersonalData />} />
        <Route path="screening/:id" element={<Screening />} />
        <Route path="order-result/:id" element={<OrderResult />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App