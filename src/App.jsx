import 'react-range-slider-input/dist/style.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Page } from './components/Page';
import { HomePage } from './components/HomePage';
import { TrainSelection } from './components/TrainSelection';
import { SeatSelection } from './components/SeatSelection';
import { PassengersInfo } from './components/PassengersInfo';
import { PaymentPage } from './components/PaymentPage';
import { CheckDataPage } from './components/CheckDataPage';
import { ResultOrderPage } from './components/ResultOrderPage';

function App() {

  return(
    <>
      <Router>
        <Routes>
          <Route path='/fe-diplom/' element={<Page/>}>
            <Route index element={<HomePage/>}/>
            <Route path='trains/' element={<TrainSelection/>}/>
            <Route path='trains/:id' element={<SeatSelection/>}/>
            <Route path='passengers/' element={<PassengersInfo/>} />
            <Route path='payment/' element={<PaymentPage/>}/>
            <Route path='checkorder/' element={<CheckDataPage/>} />
            <Route path='result/' element={<ResultOrderPage/>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
  
}

export default App
