import icon_arrow from '../img/ic_cached.png';
import vector from '../img/Vector.svg';
import calendar from '../img/Group.svg';
import banner from '../img/banner.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { citiesFromListRequest, citiesToListRequest, trainsListRequest } from '../redux/slice/trainSlice';

export const FormOrder = () => {
  let {citiesFromList, cityFromId, loadingCitiesFrom, errorCitiesFrom, citiesToList, cityToId} = useSelector(state => state.train);

  const [showCalendarHere, setShowCalendarHere] = useState(false);
  const [showCalendarBack, setShowCalendarBack] = useState(false);
  const [dateHere, setDateHere] = useState('');
  const [dateBack, setDateBack] = useState('');
  const [valueStart, setValue] = useState(new Date());
  const [valueEnd, setValueBack] = useState(new Date());
  const [cityFrom, setCityFrom] = useState({'city': '', 'id': ''});
  const [cityTo, setCityTo] = useState({'city': '', 'id': ''});
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date_start, setDateStart] = useState(null);
  const [date_end, setDateEnd] = useState(null);
  let valid = false;

  if (cityFromId !== '' && cityToId !== '' && date_start !== null && date_end !== null) {
    valid = true
  }

  const handleClick = () => {
    const form = {
      'from_city_id': cityFromId,
      'to_city_id': cityToId,
      'date_start': date_start,
      'date_end': date_end,
      'sort': 'date',
      'limit': 5,
      'offset': 0
    }
    dispatch(trainsListRequest(form))
    navigate('trains/')
  }

  useEffect(() => {
    setCityFrom((prevCity) => ({...prevCity, id: cityFromId}));
  }, [cityFromId])

  useEffect(() => {
    setCityTo((prevCity) => ({...prevCity, id: cityToId}))
  }, [cityToId])

  const onChange = (value) => {
    const time = value.toLocaleDateString('en-ca');
    const start = valueStart.toLocaleDateString('en-ca')
    if ((value > valueStart) || (new Date(time).getTime() === new Date(start).getTime())) {
      setDateStart(time);
      setDateHere(dateToString(value));
      setShowCalendarHere(false);
    }
  }

  const onChangeBack = (valueBack) => {
    if (valueBack > new Date(date_start)) {
      setDateEnd(valueBack.toLocaleDateString('en-ca'));
      setDateBack(dateToString(valueBack));
      setShowCalendarBack(false);
    }
  }
  
  const dateToString = (date) =>  {
    const result = date.toLocaleString('ru-Ru', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return result.replace(/[,%]/g, '');
  }

  const handleChangeCity = (e) => {
    if (e.target.name === 'cityFrom') {
      dispatch(citiesFromListRequest(e.target.value.toLowerCase()))
      setCityFrom((prevCity) => ({...prevCity, city: e.target.value}))
    } else if (e.target.name = 'cityTo') {
      setCityTo((prevCity) => ({...prevCity, city: e.target.value}));
      dispatch(citiesToListRequest(e.target.value.toLowerCase()));
    }
  }

  const changeCity = () => {
    let change;
    if (cityFrom !== '' && cityTo !== '') {
      change = cityFrom;
      setCityFrom(cityTo)
      setCityTo(change)
    }
  }

  return(
    <>
      <div className='header'>
        <h2 className='header-title'>Вся жизнь - <p className='strong'>путешествие!</p></h2>
        <img src={banner} className='banner'/>
        <div className='form-order'>
          <p className='form-title'>Направление</p>
          <div className='form-direction'>
            <input className='direction-here' placeholder='Откуда' name='cityFrom' defaultValue={cityFrom.city} onChange={handleChangeCity} required/>
            <img className={cityFrom.city === '' ? 'vector' : 'vector invisible'} src={vector} alt='vector'/>
            { citiesFromList.length > 0 &&
              <div className='direction-here-cities'>
                {
                  citiesFromList.map(item => 
                    (
                      <div key={item._id}>{item.name}</div>
                    )  
                  )
                }
              </div>
            }
            <button className='btn button_reverse'><img src={icon_arrow} onClick={changeCity}/></button>
            <input className='direction-to' placeholder='Куда' name='cityTo' defaultValue={cityTo.city} onChange={handleChangeCity} required/>
            <img className={cityTo.city === '' ? 'vector vector-to' : 'vector vector-to invisible'} src={vector} alt='vector' />
            { citiesToList.length > 0 && 
              <div className='directiron-to-cities'>
                {
                   citiesToList.map(item => 
                    (
                      <div key={item._id}>{item.name}</div>
                    )  
                  )
                }
              </div>
            }
          </div>
            <p className='form-title'>Дата</p>
            <div className='form-data'>
              { showCalendarHere &&
                <CalendarComponent>
                  <Calendar onChange={onChange} value={valueStart}/>
                </CalendarComponent>
              }
              <input className='direction-here-data' placeholder='ДД/ММ/ГГ' defaultValue={dateHere}/>
              <button className='btn button-data' onClick={() => setShowCalendarHere(!showCalendarHere)}><img src={calendar}/></button>
              { showCalendarBack &&
                <CalendarComponentBack>
                  <Calendar onChange={onChangeBack} value={valueEnd}/>
                </CalendarComponentBack>
              }
              <input className='direction-back-data' placeholder='ДД/ММ/ГГ' defaultValue={dateBack} />
              <button className='btn button-data-back' onClick={() => setShowCalendarBack(!showCalendarBack)}><img src={calendar}/></button>
            </div>
            <button className='btn button-find' onClick={handleClick} disabled={valid ? false : true}>Найти билеты</button>
          </div>
      </div>
    </>
  )
}

const CalendarComponent = styled.div`
  position: absolute;
  margin-top: -75px;
  z-index: 2;

  .react-calendar__month-view__days__day--weekend {
    color: #292929;
    font-weight: 600;
  }
  
  .react-calendar__tile--now {
    background-color: #F7F5F9;
  }
  
  .react-calendar__tile--active {
    background-color: #F7F5F9;
    color: #292929;
  }
  
  .react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus{
    border-radius: 5px;
    border: 2px solid #FFA800;
    background: rgba(255, 168, 0, 0.31);
  }
`
const CalendarComponentBack = styled.div`
  position: absolute;
  margin-top: -75px;
  z-index: 2;
  margin-top: -135px;
  margin-left: 350px;

.react-calendar__month-view__days__day--weekend {
  color: #292929;
  font-weight: 600;
}

.react-calendar__tile--now {
  background-color: #F7F5F9;
}

.react-calendar__tile--active {
  background-color: #F7F5F9;
  color: #292929;
}

.react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus{
  border-radius: 5px;
  border: 2px solid #FFA800;
  background: rgba(255, 168, 0, 0.31);
}
`