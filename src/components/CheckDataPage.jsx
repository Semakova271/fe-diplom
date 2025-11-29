import { Header } from "./Header"
import { MainForm } from "./MainForm"
import { StatusBar } from "./StatusBar"
import { TripDetails } from "./TripDetails"
import { Footer } from "./Footer"
import { CheckData } from "./CheckData"
import { useSelector } from "react-redux"
import { useState } from "react"

export const CheckDataPage = () => {
    const { train, seats, passengers, totalPrice, personalData } = useSelector(state => state.passengers);
    const [form, setForm] = useState({
        'from_city_id': '',
        'to_city_id': '',
        'date_start': '',
        'date_end': '',
        'sort': 'date',
        'limit': 5,
        'offset': 0
    })

    return (
        <>
            <MainForm form={form} setForm={setForm}/>
            <StatusBar status={4}/>
            <div className="main">
                <TripDetails train={train}/>
                <CheckData train={train} passengers={passengers} totalPrice={totalPrice} personalData={personalData}/>
            </div>
        </>
    )
}