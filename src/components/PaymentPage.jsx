import { Header } from "./Header"
import { MainForm } from "./MainForm"
import { StatusBar } from "./StatusBar"
import { TripDetails } from "./TripDetails"
import { Footer } from "./Footer"
import { PaymentInfo } from "./PaymentInfo"
import { useSelector } from "react-redux"
import { useState } from "react"

export const PaymentPage = () => {
    const { form } = useSelector(state => state.train)
    const { train, seats, passengers } = useSelector(state => state.passengers);
    const [data, setData] = useState({
        'from_city_id': form.from_city_id,
        'to_city_id': form.to_city_id,
        'date_start': form.date_start,
        'date_end': form.date_end,
        'sort': form.sort,
        'limit': form.limit,
        'offset': form.offset
    })

    return (
        <>
            <MainForm form={data} setForm={setData} />
            <StatusBar status={3}/>
            <div className="main">
                <TripDetails train={train}/>
                <PaymentInfo/>
            </div>
        </>
    )
}