import train_img from '../img/Group_9.svg';
import vector_there from '../img/Vector-there.svg';
import vector_back from '../img/Vector-back.svg';
import ruble from '../img/ruble.svg';
import icon from '../img/Group_2.2.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { orderRequest } from '../redux/slice/passengersSlice';
import { useEffect } from 'react';

export const CheckData = ({passengers, train, totalPrice, personalData}) => {
    const { trainId, trainIdBack } = useSelector(state => state.train)
    const { allSeats, loadingOrder, errorOrder, successOrder, totalPriceBack } = useSelector(state => state.passengers)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log(passengers)
    console.log(errorOrder, successOrder)

    useEffect(() => {
        if (successOrder && successOrder.status) {
            navigate('/fe-diplom/result/');
        }
    }, [successOrder, navigate])

    const data = passengers.map(passenger => {
        let ticket;
        const info = {
            "is_adult": passenger.age === 'Взрослый' ? true : false,
            "first_name": passenger.name,
            "last_name": passenger.surname,
            "patronymic": passenger.secondName,
            "gender": passenger.gender === 'male' ? true : false,
            "birthday": passenger.dataBirthday,
            "document_type": passenger.typeDocument,
            "document_data": passenger.typeDocument === 'passport' ? passenger.document.series + passenger.document.number : passenger.document
        }
        allSeats.departure.forEach(seat => {
            ticket = {
                "coach_id": seat.id,
                "person_info": info,
                "seat_number": seat.seat.seat_id,
                "include_children_seat": false
            }
        })
        return ticket;
    })

    const dataBack = allSeats.arrival.length > 0 ? passengers.map(passenger => {
        let ticket;
        const info = {
            "is_adult": passenger.age === 'Взрослый' ? true : false,
            "first_name": passenger.name,
            "last_name": passenger.surname,
            "patronymic": passenger.secondName,
            "gender": passenger.gender === 'male' ? true : false,
            "birthday": passenger.dataBirthday,
            "document_type": passenger.typeDocument,
            "document_data": passenger.typeDocument === 'passport' ? passenger.document.series + passenger.document.number : passenger.document
        }
        allSeats.arrival.forEach(seat => {
            ticket = {
                "coach_id": seat.id,
                "person_info": info,
                "seat_number": seat.seat.seat_id,
                "include_children_seat": false
            }
        })
        return ticket;
    }) : null

    const handleClick = () => {
        const order = JSON.stringify({
            "user": {
                "first_name": personalData.name,
                "last_name": personalData.surname,
                "patronymic": personalData.secondName,
                "phone": personalData.telephone,
                "email": personalData.mail,
                "payment_method": personalData.payment
              },
            "departure": {
                "route_direction_id": trainId,
                "seats": data
            },
            "arrival": {
                "route_direction_id": trainIdBack,
                "seats": dataBack
            },
        })
        console.log(order)
        dispatch(orderRequest(order))
        //navigate('/trips/result/');
    }

    if (errorOrder) {
        return (
            <div className="error-message">
                Произошла ошибка при создании заказа. Пожалуйста, попробуйте еще раз.
            </div>
        )
    }

    return (
        <>
            <section className="check-data-block">
                <div className="check-data-train-info">
                    <h2 className="check-data-title">Поезд</h2>
                    <div className="check-data-train-card">
                        <div className='train-card-info'>
                            <img className='train-img' src={train_img}/>
                            <p className='train-number'>{train[0].departure.name}</p>
                            <ul className='train-points'>
                                <li className='train-point-depature'>{train[0].departure.fromCity}
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none" className='svg-train'>
                                    <path d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5L13 4.5V3.5L0 3.5L0 4.5Z" fill="#292929"/>
                                </svg>
                                </li>
                                <li className='train-point-arrival'>{train[0].departure.toCity}</li>
                            </ul>
                        </div>
                        <div className='train-card-direction'>
                            <div className='train-card-direction-there'>
                                <ul className='train-depature-start'>
                                    <li className='train-depature-time'>{train[0].departure.datetimeFrom}</li>
                                    <li className='train-depature-city'>{train[0].departure.fromCity}</li>
                                    <li className='train-depature-station'>{train[0].departure.stationFrom} вокзал</li>
                                </ul>
                                <div className='duration'>
                                    <p className='duration-time'>{train[0].departure.duration.hours + ':' + train[0].departure.duration.minutes}</p>
                                    <img className='duration-img' src={vector_there}/>
                                </div>
                                <ul className='train-depature-end'>
                                    <li className='train-depature-time'>{train[0].departure.datetimeTo}</li>
                                    <li className='train-depature-city'>{train[0].departure.toCity}</li>
                                    <li className='train-depature-station'>{train[0].departure.stationTo} вокзал</li>
                                </ul>
                            </div>
                            { train[1].arrival && <div className='train-card-direction-back'>
                                <ul className='train-depature-start'>
                                    <li className='train-depature-time'>{train[1].arrival.datetimeFrom}</li>
                                    <li className='train-depature-city'>{train[1].arrival.fromCity}</li>
                                    <li className='train-depature-station'>{train[1].arrival.stationFrom} вокзал</li>
                                </ul>
                                <div className='duration'>
                                    <p className='duration-time'>{train[1].arrival.duration.hours + ':' + train[1].arrival.duration.minutes}</p>
                                    <img className='duration-img' src={vector_back}/>
                                </div>
                                <ul className='train-depature-end'>
                                <li className='train-depature-time'>{train[1].arrival.datetimeTo}</li>
                                <li className='train-depature-city'>{train[1].arrival.toCity}</li>
                                    <li className='train-depature-station'>{train[1].arrival.stationTo} вокзал</li>
                                </ul>
                            </div>}
                        </div>
                        <div className='train-card-conditions'>
                            <ul className='train-card-places'>
                                { train[0].departure.seats.fourth && 
                                    <li className='train-card-place'>
                                        Сидячий 
                                        <p className='train-card-place-amount'>{train[0].departure.seats.fourth}</p>
                                        <p className='train-card-place-price'>
                                            от 
                                            <span className='train-card-place-cost'>{train[0].departure.price.fourth.top_price}</span>
                                            <img className='train-card-place-price-img' src={ruble}/>
                                        </p>
                                    </li>
                                }
                                { train[0].departure.seats.third &&
                                    <li className='train-card-place'>
                                        Плацкарт 
                                        <p className='train-card-place-amount'>{train[0].departure.seats.third}</p>
                                        <p className='train-card-place-price'>
                                            от 
                                            <span className='train-card-place-cost'>{train[0].departure.price.third.top_price}</span>
                                            <img className='train-card-place-price-img' src={ruble}/>
                                        </p>
                                    </li>
                                }
                                { train[0].departure.seats.second &&
                                    <li className='train-card-place'>
                                        Купе
                                        <p className='train-card-place-amount'>{train[0].departure.seats.second}</p>
                                        <p className='train-card-place-price'>
                                            от 
                                            <span className='train-card-place-cost'>{train[0].departure.price.second.top_price}</span>
                                            <img className='train-card-place-price-img' src={ruble}/>
                                        </p>
                                    </li>
                                }
                                { train[0].departure.seats.first &&
                                    <li className='train-card-place'>
                                        Люкс
                                        <p className='train-card-place-amount'>{train[0].departure.seats.first}</p>
                                        <p className='train-card-place-price'>
                                            от 
                                            <span className='train-card-place-cost'>{train[0].departure.price.first.top_price}</span>
                                            <img className='train-card-place-price-img' src={ruble}/>
                                        </p>
                                    </li>
                                }
                            </ul>
                            <img className='train-card-place-img' src={icon}/>
                            <button className='btn train-card-change-btn' onClick={() => navigate('/fe-diplom/trains')}>Изменить</button>
                        </div>
                    </div>
                </div>
                <div className='check-data-passengers-block'>
                    <h2 className='check-data-title'>Пассажиры</h2>
                    <div className='check-data-passengers-info'>
                        <div className='check-data-passengers'>
                            { passengers?.map((passenger, index) => {
                                return (
                                    <div key={index}>
                                        <div className='check-data-passenger'>
                                            <div className='check-data-passenger-type'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68" fill="none">
                                                    <path d="M34 0C15.2492 0 0 15.2492 0 34C0 52.7508 15.2492 68 34 68C52.7508 68 68 52.7508 68 34C68 15.2492 52.7508 0 34 0ZM33.887 16.3787C38.8571 16.3787 42.9236 20.3322 42.9236 25.3023C42.9236 30.2724 38.9701 34.3389 34 34.3389C29.0299 34.3389 24.9635 30.2724 24.9635 25.3023C25.0764 20.4452 29.0299 16.3787 33.887 16.3787ZM51.9601 52.186C39.8738 52.186 28.1262 52.186 16.2658 52.186C15.701 46.5382 15.701 44.392 21.3488 41.6811C29.7076 37.7276 38.2924 37.7276 46.7641 41.6811C47.8937 42.1329 48.9103 42.9236 49.8139 43.6013C51.2824 44.8439 52.0731 46.4252 51.9601 48.3455C51.9601 49.701 51.9601 50.8306 51.9601 52.186Z" fill="#FFA800"/>
                                                </svg>
                                                <span>{passenger.age}</span>
                                            </div>
                                            <div className='check-data-passenger-info'>
                                                <span className='check-data-passenger-info-title'>{passenger.surname}  {passenger.name}  {passenger.secondName}</span>
                                                <ul className='check-data-passenger-info-items'>
                                                    <li className='check-data-passenger-info-item'>Пол {passenger.gender === 'male' ? 'мужской': 'женский'}</li>
                                                    <li className='check-data-passenger-info-item'>Дата рождения {passenger.dataBirthday}</li>
                                                    <li className='check-data-passenger-info-item'>
                                                        {passenger.age === 'Взрослый' ? 'Паспорт РФ ' + passenger.document.series + ' ' + passenger.document.number 
                                                        : 'Свидетельство о рождении ' + passenger.document}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <span className='line-bottom'></span>
                                    </div>
                                )
                            })
                        }
                        </div>
                        <div className='check-data-passengers-result-block'>
                            <div className='check-data-passengers-result-block-block'>
                                <div className='check-data-passengers-result'>
                                    <span className='check-data-passengers-result-title'>Всего</span>
                                    <span className='check-data-passengers-result-sum'>{totalPrice + totalPriceBack}</span>
                                    <img className='train-card-place-price-img' src={ruble}/>
                                </div>
                                <button className='btn train-card-change-btn' onClick={() => navigate('/fe-diplom/passengers/')}>Изменить</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='check-data-payment-block'>
                    <h2 className='check-data-title'>Способ оплаты</h2>
                    <div className='check-data-payment-info'>
                        <div className='check-data-payment-cash'>
                            {personalData?.payment === "cash" ? 'Наличными' : 'Онлайн'}
                        </div>
                        <button className='btn train-card-change-btn' onClick={() => navigate('/fe-diplom/payment/')}>Изменить</button>
                    </div>
                </div>
                <button className='btn check-data-done-btn' onClick={handleClick}>Подтвердить</button>
            </section>
        </>
    )
}