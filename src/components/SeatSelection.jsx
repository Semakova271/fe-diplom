import { Header } from "./Header";
import { MainForm } from "./MainForm";
import { StatusBar } from "./StatusBar";
import { SeatForm } from "./SeatForm";
import { SideBar } from "./SideBar";
import { LastTickets } from "./LastTickets";
import { Footer } from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { lastRoutesRequest } from "../redux/slice/trainSlice";
import { format } from "date-fns";
import { Loader } from "./Preloader";

export const SeatSelection = () => {
    const { trainSeats, trainSeatsBack, lastRoutes, selectedTrain, form, loadingTrainSeats, errorTrainSeats} = useSelector(state => state.train);
    const dispatch = useDispatch();
    const [data, setData] = useState({
        'from_city_id': form.from_city_id,
        'to_city_id': form.to_city_id,
        'date_start': form.date_start,
        'date_end': form.date_end,
        'sort': form.sort,
        'limit': form.limit,
        'offset': form.offset
    })

    console.log(trainSeats)
    console.log(selectedTrain)

    useEffect(() => {
        dispatch(lastRoutesRequest())
    }, [dispatch])

    return (
        <>
            <MainForm form={data} setForm={setData}/>
            { loadingTrainSeats && <Loader/>}
            { errorTrainSeats && 
                <div className="error-message">
                    Произошла ошибка при загрузке данных о поездах. Пожалуйста, попробуйте еще раз.
                </div>
            }
            { !loadingTrainSeats && trainSeats ?
                <>
                    <StatusBar status={1}/>
                    <div className="main">
                        <div>
                            <SideBar form={data} setForm={setData}/>
                            <LastTickets lastRoutes={lastRoutes}/>
                        </div>
                        <SeatForm selectedTrain={selectedTrain} trainSeats={trainSeats} trainSeatsBack={trainSeatsBack}/>
                    </div>
                </> : null
            } 
        </>
    )
}