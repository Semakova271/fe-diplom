import icon_arrow from '../img/ic_cached.png';
import vector from '../img/Vector.svg';
import calendar from '../img/Group.svg';
import banner from '../img/banner_2.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { citiesFromListRequest, citiesToListRequest, trainsListRequest } from '../redux/slice/trainSlice';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const MainForm = ({form, setForm}) => {
    let {citiesFromList, cityFromId, citiesToList, cityToId} = useSelector(state => state.train);
    const [showCalendarHere, setShowCalendarHere] = useState(false);
    const [showCalendarBack, setShowCalendarBack] = useState(false);
    const [dateHere, setDateHere] = useState('');
    const [dateBack, setDateBack] = useState('');
    const [value, setValue] = useState(new Date());
    const [valueBack, setValueBack] = useState(new Date());
    const [cityFrom, setCityFrom] = useState({'city': '', 'id': ''});
    const [cityTo, setCityTo] = useState({'city': '', 'id': ''});
   
    const dispatch = useDispatch();

    console.log(form)

    useEffect(() => {
        setCityFrom((prevCity) => ({...prevCity, id: cityFromId}));
        setForm(prevForm => ({...prevForm, from_city_id: cityFromId}));
    }, [cityFromId])
    
    useEffect(() => {
        setCityTo((prevCity) => ({...prevCity, id: cityToId}))
        setForm(prevForm => ({...prevForm, to_city_id: cityToId}))
    }, [cityToId])


    const handleChangeCity = (e) => {
        if (e.target.name === 'cityFrom') {
          dispatch(citiesFromListRequest(e.target.value))
          setCityFrom((prevCity) => ({...prevCity, city: e.target.value}))
        } else if (e.target.name = 'cityTo') {
          setCityTo((prevCity) => ({...prevCity, city: e.target.value}));
          dispatch(citiesToListRequest(e.target.value));
        }
      }
    
      const changeCity = () => {
        let change;
        if (cityFrom !== '' && cityTo !== '') {
          change = cityFrom;
          setForm(prevForm => ({...prevForm, from_city_id: cityTo.id}));
          setCityFrom(cityTo)
          setForm(prevForm => ({...prevForm, to_city_id: change.id}));
          setCityTo(change)
          console.log(form)
        }
      }

    const onChange = (value) => {
        setForm(prevForm => ({...prevForm, date_start: value.toLocaleDateString('en-ca')}));
        setDateHere(dateToString(value));
        setShowCalendarHere(false);
    }

    const onChangeBack = (valueBack) => {
        setForm(prevForm => ({...prevForm, date_end: valueBack.toLocaleDateString('en-ca')}))
        setDateBack(dateToString(valueBack));
        setShowCalendarBack(false);
    }    

    const dateToString = (date) =>  {
        const result = date.toLocaleString('ru-Ru', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        });
        return result.replace(/[,%]/g, '');
    }

    const handleClick = () => {
        if (form.from_city_id == '' && form.to_city_id == '' && form.date_end == '' && form.date_start == '') {
          return
        }
        dispatch(trainsListRequest(form))
      }

    return(
        <>
            <div className='header header-main'>
                  <img src={banner} className='banner-main'/>
                  <div className='form-main'>
                    <div>
                        <p className='form-title'>Направление</p>
                        <div className='form-direction'>
                            <input className='direction-here' placeholder='Откуда' name='cityFrom' defaultValue={cityFrom.city} onChange={handleChangeCity}/>
                            <img className={cityFrom.city === '' ? 'vector' : 'vector invisible'} src={vector} alt='vector' />
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
                            <input className='direction-to' placeholder='Куда' name='cityTo' defaultValue={cityTo.city} onChange={handleChangeCity}/>
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
                    </div>
                    <div>
                        <p className='form-title'>Дата</p>
                        <div className='form-data'>
                            { showCalendarHere &&
                                <div className='calender'>
                                    <Calendar onChange={onChange} value={value}/>
                                </div>
                            }
                            <input className='direction-here-data' placeholder='ДД/ММ/ГГ' defaultValue={dateHere}/>
                            <button type='button' className='btn button-data' onClick={() => setShowCalendarHere(!showCalendarHere)}><img src={calendar}/></button>
                            { showCalendarBack &&
                                <div className='calender calendar_back'>
                                    <Calendar onChange={onChangeBack} value={valueBack}/>
                                </div>
                            }
                            <input className='direction-back-data' placeholder='ДД/ММ/ГГ' defaultValue={dateBack}/>
                            <button className='btn button-data-back'><img src={calendar} onClick={() => setShowCalendarBack(!showCalendarBack)}/></button>
                        </div>
                        <button className='btn button-find' onClick={handleClick}>Найти билеты</button>
                    </div> 
                </div>
            </div>
        </>
    )
}