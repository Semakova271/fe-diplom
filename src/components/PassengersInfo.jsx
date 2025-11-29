import { Header } from "./Header"
import { MainForm } from "./MainForm"
import { StatusBar } from "./StatusBar"
import { Footer } from "./Footer"
import { TripDetails } from "./TripDetails"
import { PassengersBlock } from "./PassengersBlock"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deletePassenger } from "../redux/slice/passengersSlice"

export const PassengersInfo = () => {
    const { train, seats, passengers } = useSelector(state => state.passengers);
    const { form } = useSelector(state => state.train);
    let totalCount = seats[0].count + seats[1].count;
    const [count, setCount] = useState(
        Array(totalCount)
      .fill()
      .map((e, i) => i + 1)
    )
    console.log(totalCount, passengers)
    const [data, setData] = useState({
        'from_city_id': form.from_city_id,
        'to_city_id': form.to_city_id,
        'date_start': form.date_start,
        'date_end': form.date_end,
        'sort': form.sort,
        'limit': form.limit,
        'offset': form.offset
    })
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deletePassenger({id}));
        const newCount = Array(totalCount - 1)
        .fill()
        .map((e, i) => i + 1)
        setCount(newCount)
    }
    console.log(count)

    return (
        <>
            <MainForm form={data} setForm={setData}/>
            <StatusBar status={2}/>
            <div className="main">
                <TripDetails train={train}/>
                <PassengersBlock count={count} setCount={setCount} handleDelete={handleDelete}/>
            </div>
        </>
    )
}