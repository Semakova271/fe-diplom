import subtract from '../img/Subtract.svg';
import subtract_2 from '../img/Subtract_2.png';
import passengers from '../img/passengers.svg';
import ruble from '../img/ruble.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const TripDetails = ({train}) => {
    const { totalPrice, totalPriceBack, seats, seatsBack } = useSelector(state => state.passengers)
    const [showBtn, setShowBtn] = useState(true);
    const [showBtnBack, setShowBtnBack] = useState(true);
    const [showPassengers, setShowPassengers] =useState(true);
    const [showBlock, setShowBlock] = useState(true);
    const [showBlockBack, setShowBlockBack] = useState(true);
    const [showBlockPassengers, setShowBlockPassengers] = useState(true);

    console.log(train)

    const changeHandle = () => {
        if (showBtn === false) {
            setShowBtn(!showBtn);
            setShowBlock(true)
        } else {
            setShowBlock(false);
            setShowBtn(!showBtn); 
        }  
    }

    const changeHandleBtn = () => {
        if (showBtnBack === false) {
            setShowBtnBack(!showBtnBack);
            setShowBlockBack(true)
        } else {
            setShowBlockBack(false);
            setShowBtnBack(!showBtnBack); 
        }  
    }

    const changeHandlePassengers = () => {
        if (showPassengers === false) {
            setShowPassengers(!showPassengers);
            setShowBlockPassengers(true);
        } else {
            setShowBlockPassengers(false);
            setShowPassengers(!showPassengers);
        }
    }

    return (
        <>
            <aside className="trip-details-block">
                <h2 className="trip-details-block-title">Детали поездки</h2>
                <div className='trip-details-there-block'>
                    <div className='trip-details-there'> 
                        <img className='trip-details-there-time-img' src={subtract} />
                        <h3 className='trip-details-title'>Туда</h3>
                        <span className='trip-details-there-data'>{train[0].departure.dateFrom}</span>
                        <button className='btn trip-details-there-time-btn' onClick={() => changeHandle()}>
                            { showBtn ? 
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className='svg-minus'>
                                    <rect x="1" y="1" width="18" height="18" rx="4" stroke="#C4C4C4" strokeWidth="2"/>
                                    <line x1="5.61536" y1="9.76929" x2="14.3846" y2="9.76929" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg> : 
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className='svg-plus'>
                                    <path d="M9.2218 4.20293L9.2218 9.18841L4.23632 9.18841C3.77255 9.18841 3.42473 9.53623 3.42473 10C3.42473 10.4638 3.77255 10.8116 4.23632 10.8116L9.2218 10.8116L9.2218 15.7971C9.2218 16.2608 9.56962 16.6087 9.97542 16.5507L10.0914 16.5507C10.5551 16.5507 10.9029 16.2029 10.845 15.7971V10.8116H15.7145C16.1783 10.8116 16.5261 10.4638 16.5261 10C16.5261 9.53623 16.1783 9.18841 15.7145 9.18841H10.845V4.20293C10.845 3.73917 10.4972 3.39134 10.0914 3.44931L9.97542 3.44931C9.51165 3.44931 9.16383 3.79714 9.2218 4.20293Z" fill="white"/>
                                    <rect x="1" y="1" width="18" height="18" rx="4" stroke="white" strokeWidth="2"/>
                                </svg>
                            }
                        </button>
                    </div>
                    { showBlock ? (
                        <div>
                            <div className='trip-details-there-train'>
                                № Поезда
                                <span className='trip-details-there-train-number'>{train[0].departure.name}</span>
                            </div>
                            <div className='trip-details-there-train-name'>
                               Название
                                <span className='trip-details-there-name-city'>{train[0].departure.fromCity} <span>{train[0].departure.toCity}</span></span>
                            </div>
                            <div className='trip-details-there-time-block'>
                                <div className='trip-details-there-time-depature'>
                                    {train[0].departure.datetimeFrom}
                                    <span className='trip-details-there-time-depature-data'>{train[0].departure.dateFrom}</span>
                                </div>
                                <div className='trip-details-there-time-duration'>
                                    {train[0].departure.duration.hours + ':' + train[0].departure.duration.minutes}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 30 20" fill="none">
                                        <path d="M19.3627 20C19.3627 17.8073 19.3627 15.3821 19.3627 12.8239C12.8621 12.8239 6.46582 12.8239 0 12.8239C0 11.0299 0 9.36877 0 7.57475C6.32677 7.57475 12.7231 7.57475 19.3279 7.57475C19.3279 4.91694 19.3279 2.42525 19.3279 0C22.9432 3.3887 26.5238 6.77741 30 10.0664C26.5585 13.2558 22.9432 16.6445 19.3627 20Z" fill="#FFA800"/>
                                    </svg>
                                </div>
                                <div className='trip-details-there-time-arrival'>
                                    {train[0].departure.datetimeTo}
                                    <span className='trip-details-there-time-arrival-data'>{train[0].departure.dateTo}</span>
                                </div>
                            </div>
                            <div className='trip-details-there-city-block'>
                                <div className='trip-details-there-city-depature'>
                                    {train[0].departure.fromCity} 
                                    <span className='trip-details-there-station-depature'>{train[0].departure.stationFrom} вокзал</span>
                                </div>
                                <div className='trip-details-there-city-arrival'>
                                    {train[0].departure.toCity} 
                                    <span className='trip-details-there-station-arrival'>{train[0].departure.stationTo} вокзал</span>
                                </div>
                            </div>
                        </div>
                    ) : null
                    }
                </div>
               { train[1].arrival && <div className='trip-details-back-block'>
                    <div className='trip-details-back'>
                        <img className='trip-details-back-time-img' src={subtract_2}/>
                        <h3 className='trip-details-title'>Обратно</h3>
                        <span className='trip-details-back-data'>{train[1].arrival.dateFrom}</span>
                        <button className='btn trip-details-back-time-btn' onClick={() => changeHandleBtn()}>
                            { showBtnBack ? 
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className='svg-minus'>
                                <rect x="1" y="1" width="18" height="18" rx="4" stroke="#C4C4C4" strokeWidth="2"/>
                                <line x1="5.61536" y1="9.76929" x2="14.3846" y2="9.76929" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg> : 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className='svg-plus'>
                                <path d="M9.2218 4.20293L9.2218 9.18841L4.23632 9.18841C3.77255 9.18841 3.42473 9.53623 3.42473 10C3.42473 10.4638 3.77255 10.8116 4.23632 10.8116L9.2218 10.8116L9.2218 15.7971C9.2218 16.2608 9.56962 16.6087 9.97542 16.5507L10.0914 16.5507C10.5551 16.5507 10.9029 16.2029 10.845 15.7971V10.8116H15.7145C16.1783 10.8116 16.5261 10.4638 16.5261 10C16.5261 9.53623 16.1783 9.18841 15.7145 9.18841H10.845V4.20293C10.845 3.73917 10.4972 3.39134 10.0914 3.44931L9.97542 3.44931C9.51165 3.44931 9.16383 3.79714 9.2218 4.20293Z" fill="white"/>
                                <rect x="1" y="1" width="18" height="18" rx="4" stroke="white" strokeWidth="2"/>
                            </svg>
                            }
                        </button>
                    </div>
                    { showBlockBack ? (
                        <div>
                            <div className='trip-details-back-train'>
                                № Поезда
                                <span className='trip-details-back-train-number'>{train[1].arrival.name}</span>
                            </div>
                            <div className='trip-details-back-train-name'>
                               Название
                                <span className='trip-details-back-name-city'>{train[1].arrival.fromCity} <span>{train[1].arrival.toCity}</span></span>
                            </div>
                            <div className='trip-details-back-time-block'>
                                <div className='trip-details-back-time-depature'>
                                    {train[1].arrival.datetimeFrom}
                                    <span className='trip-details-back-time-depature-data'>{train[1].arrival.dateFrom}</span>
                                </div>
                                <div className='trip-details-back-time-duration'>
                                    {train[1].arrival.duration.hours + ':' + train[1].arrival.duration.minutes}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 30 20" fill="none">
                                        <path d="M10.6373 20C10.6373 17.8073 10.6373 15.3821 10.6373 12.8239C17.1379 12.8239 23.5342 12.8239 30 12.8239C30 11.0299 30 9.36877 30 7.57475C23.6732 7.57475 17.2769 7.57475 10.6721 7.57475C10.6721 4.91694 10.6721 2.42525 10.6721 0C7.05678 3.3887 3.47625 6.77741 1.90735e-06 10.0664C3.44148 13.2558 7.05678 16.6445 10.6373 20Z" fill="#FFA800"/>
                                    </svg>
                                </div>
                                <div className='trip-details-back-time-arrival'>
                                    {train[1].arrival.datetimeTo}
                                    <span className='trip-details-back-time-arrival-data'>{train[1].arrival.dateTo}</span>
                                </div>
                            </div>
                            <div className='trip-details-back-city-block'>
                                <div className='trip-details-back-city-depature'>
                                    {train[1].arrival.fromCity}
                                    <span className='trip-details-back-station-depature'>{train[1].arrival.stationFrom} вокзал</span>
                                </div>
                                <div className='trip-details-back-city-arrival'>
                                    {train[1].arrival.toCity}
                                    <span className='trip-details-back-station-arrival'>{train[1].arrival.stationTo} вокзал</span>
                                </div>
                            </div>
                        </div>
                    ) : null
                    }
                </div>}
                <div className='trip-details-passengers-block'>
                    <div className='trip-details-passengers'>
                        <img className='trip-details-passengers-img' src={passengers} />
                            <h3 className='trip-details-title'>Пассажиры</h3>
                            <button className='btn trip-details-passengers-btn' onClick={() => changeHandlePassengers()}>
                            { showPassengers ? 
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className='svg-minus'>
                                    <rect x="1" y="1" width="18" height="18" rx="4" stroke="#C4C4C4" strokeWidth="2"/>
                                    <line x1="5.61536" y1="9.76929" x2="14.3846" y2="9.76929" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg> : 
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className='svg-plus'>
                                    <path d="M9.2218 4.20293L9.2218 9.18841L4.23632 9.18841C3.77255 9.18841 3.42473 9.53623 3.42473 10C3.42473 10.4638 3.77255 10.8116 4.23632 10.8116L9.2218 10.8116L9.2218 15.7971C9.2218 16.2608 9.56962 16.6087 9.97542 16.5507L10.0914 16.5507C10.5551 16.5507 10.9029 16.2029 10.845 15.7971V10.8116H15.7145C16.1783 10.8116 16.5261 10.4638 16.5261 10C16.5261 9.53623 16.1783 9.18841 15.7145 9.18841H10.845V4.20293C10.845 3.73917 10.4972 3.39134 10.0914 3.44931L9.97542 3.44931C9.51165 3.44931 9.16383 3.79714 9.2218 4.20293Z" fill="white"/>
                                    <rect x="1" y="1" width="18" height="18" rx="4" stroke="white" strokeWidth="2"/>
                                </svg>
                            }
                        </button>
                    </div>
                    { showBlockPassengers ? (
                        <div>
                            <div className='trip-details-passengers-old'>
                                <span className='trip-details-passengers-old-number'>{seats[0].count} Взрослых</span>
                                <div className='trip-details-passengers-old-cost'>
                                    {seats[0].price + seatsBack[0]?.price}
                                    <img src={ruble} className='trip-details-passengers-old-img'/>
                                </div>
                            </div>
                            { seats[1].count > 0 &&
                                <div className='trip-details-passengers-child'>
                                    <span className='trip-details-passengers-child-number'>{seats[1].count} Ребенок</span>
                                    <div className='trip-details-passengers-child-cost'>
                                        {seats[1].price + seatsBack[1]?.price} 
                                        <img src={ruble} className='trip-details-passengers-child-img'/>
                                    </div>
                                </div>
                            }
                        </div>
                    ): null
                    }
                </div>
                <div className='trip-details-result'>
                    <h2 className='trip-details-result-title'>Итог</h2>
                    <div className='trip-details-result-sum'>
                        {totalPrice + totalPriceBack}
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="32" viewBox="0 0 26 32" fill="none" className='trip-details-result-svg'>
                            <path d="M6.50073 19.2081C6.50073 20.2833 6.50073 21.3372 6.50073 22.4039C9.20503 22.4039 11.9007 22.4039 14.6093 22.4039C14.6093 23.4749 14.6093 24.5331 14.6093 25.6083C11.9093 25.6083 9.20936 25.6083 6.50073 25.6083C6.50073 27.746 6.50073 29.8666 6.50073 32C5.41294 32 4.33815 32 3.24603 32C3.24603 29.8751 3.24603 27.7502 3.24603 25.6168C2.15824 25.6168 1.08779 25.6168 0.00433382 25.6168C0.00433382 24.5459 0.00433382 23.4877 0.00433382 22.4125C1.07912 22.4125 2.15391 22.4125 3.23303 22.4125C3.23303 21.3415 3.23303 20.2876 3.23303 19.2166C2.15824 19.2166 1.08345 19.2166 0 19.2166C0 18.1414 0 17.0832 0 16.0122C1.07479 16.0122 2.14957 16.0122 3.23736 16.0122C3.23736 10.6744 3.23736 5.34944 3.23736 0.0159157C3.30237 0.0116489 3.34571 0.00738204 3.39338 0.00738204C7.7272 0.00738204 12.061 -0.0139521 16.3948 0.0159157C18.8954 0.032983 21.071 0.933282 22.8999 2.61441C24.4341 4.02246 25.4222 5.74625 25.8122 7.77726C26.3539 10.6062 25.7212 13.1876 23.9443 15.4746C22.7265 17.0448 21.136 18.1286 19.2292 18.7473C18.2974 19.0502 17.3396 19.2081 16.3602 19.2081C13.1401 19.2123 9.92444 19.2081 6.70442 19.2123C6.63941 19.2081 6.5744 19.2081 6.50073 19.2081ZM6.50506 3.2075C6.50506 7.48712 6.50506 11.7454 6.50506 16.008C6.55273 16.008 6.59174 16.008 6.63074 16.008C9.88111 16.008 13.1315 16.0165 16.3818 15.9994C16.8846 15.9952 17.4003 15.9226 17.8857 15.7989C21.3224 14.9029 23.3636 11.5747 22.5835 8.17408C21.9161 5.27264 19.2898 3.2075 16.2648 3.2075C13.0795 3.2075 9.89411 3.2075 6.70875 3.2075C6.64374 3.2075 6.57874 3.2075 6.50506 3.2075Z" fill="#E5E5E5"/>
                        </svg>
                    </div>
                </div>
            </aside> 
        </>
    )
}