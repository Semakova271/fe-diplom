import { Header } from "./Header"
import { MainForm } from "./MainForm"
import { StatusBar } from "./StatusBar"
import { SideBar } from "./SideBar";
import { LastTickets } from "./LastTickets";
import { SearchControl } from "./SearchControl";
import { Footer } from "./Footer";
import { TrainCards } from "./TrainCards";
import { TrainsMenu } from "./TrainsMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { lastRoutesRequest, sortTrains, trainsListRequest } from "../redux/slice/trainSlice";
import { Loader } from "./Preloader";
import { Error } from "./Error";
import { Info } from "./Info";


export const TrainSelection = () => {
    const { trainsList, lastRoutes, form, loadingTrainsList, errorTrainsList} = useSelector(state => state.train);
    const {total_count, items} = trainsList;
    const [sort, setSort] = useState('времени');
    const dispatch = useDispatch();
    const [data, setData] = useState({
        'from_city_id': form.from_city_id,
        'to_city_id': form.to_city_id,
        'date_start': form.date_start,
        'date_end': form.date_end,
        'sort': form.sort,
        'limit': form.limit,
        'offset': form.offset,
        'price_min': 500
    })
    console.log(trainsList)
    console.log(errorTrainsList)

    useEffect(() => {
        dispatch(lastRoutesRequest())
    }, [])


    useEffect(() => { 
        dispatch(trainsListRequest(data))
    }, [sort,
        data.limit,
        data.offset,
        data.date_end,
        data.date_start,
        data.have_second_class,
        data.have_third_class,
        data.have_first_class,
        data.have_fourth_class,
        data.price_from,
        data.price_to,
        data.start_departure_hour_from,
        data.start_departure_hour_to,
        data.end_departure_hour_from,
        data.end_departure_hour_to,
        data.start_arrival_hour_from,
        data.start_arrival_hour_to,
        data.end_arrival_hour_from,
        data.end_arrival_hour_to
    ])
 

    return(
        <>
            <MainForm form={data} setForm={setData}/>
            { loadingTrainsList && 
                <Loader/>
            }
            { errorTrainsList && 
                <Error/>
            }
            { !loadingTrainsList && total_count === 0 && 
                <Info/> 
            }
            { !loadingTrainsList && items && (
                <>
                    <StatusBar status={1}/>
                    <div className="main">
                        <div>
                            <SideBar form={data} setForm={setData}/>
                            <LastTickets lastRoutes={lastRoutes}/>
                        </div>
                        <section className="trains">
                            <SearchControl totalCount={total_count} sort={sort} setSort={setSort} form={data} setForm={setData}/> 
                            <TrainCards items={items}/>
                            {
                                items?.length > 0 && 
                                <TrainsMenu count={total_count} limit={data.limit} setForm={setData}/>
                            }                    
                        </section>
                    </div>
                </>
            )}
            
        </>
    )
}