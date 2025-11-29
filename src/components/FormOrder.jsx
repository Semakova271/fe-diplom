import icon_arrow from '../img/ic_cached.png';
import vector from '../img/Vector.svg';
import banner from '../img/banner.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  citiesFromListRequest, 
  citiesToListRequest, 
  trainsListRequest,
  setDateStart,
  setDateEnd 
} from '../redux/slice/trainSlice';
import DatePicker from './DatePicker';

export const FormOrder = () => {
  const { 
    citiesFromList, 
    cityFromId, 
    citiesToList, 
    cityToId,
    form 
  } = useSelector(state => state.train);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Проверяем валидность формы
  const isValid = cityFromId !== '' && cityToId !== '' && form.date_start !== '';

  const handleSearch = (e) => {
    e.preventDefault();
    if (isValid) {
      const searchData = {
        ...form,
        from_city_id: cityFromId,
        to_city_id: cityToId,
      };
      dispatch(trainsListRequest(searchData));
      navigate('trains/');
    }
  };

  const handleCityFromChange = (e) => {
    const value = e.target.value;
    dispatch(citiesFromListRequest(value.toLowerCase()));
  };

  const handleCityToChange = (e) => {
    const value = e.target.value;
    dispatch(citiesToListRequest(value.toLowerCase()));
  };

  const selectCityFrom = (city) => {
    dispatch(citiesFromListRequest(city.name));
    // Очищаем список городов после выбора
    setTimeout(() => {
      dispatch({ type: 'train/citiesFromListSuccess', payload: [] });
    }, 100);
  };

  const selectCityTo = (city) => {
    dispatch(citiesToListRequest(city.name));
    // Очищаем список городов после выбора
    setTimeout(() => {
      dispatch({ type: 'train/citiesToListSuccess', payload: [] });
    }, 100);
  };

  const swapCities = () => {
    if (cityFromId && cityToId) {
      const tempCity = { name: citiesFromList.find(city => city._id === cityFromId)?.name, id: cityFromId };
      const tempCityTo = { name: citiesToList.find(city => city._id === cityToId)?.name, id: cityToId };
      
      dispatch(citiesFromListRequest(tempCityTo.name));
      dispatch(citiesToListRequest(tempCity.name));
    }
  };

  return (
    <div className="header-main">
      <div className="banner-main"></div>
      <div className="container-fluid">
        <div className="header">
          <div className="container-logo">Лого</div>
          <nav className="nav-items">
            <a href="/fe-diplom/" className="nav-item">Главная</a>
            <a href="/fe-diplom/trains/" className="nav-item">Выбор поезда</a>
          </nav>
        </div>
      </div>
      
      <div className="header-title">
        Вся жизнь - <span className="strong">путешествие!</span>
      </div>

      <div className="form-main">
        <form onSubmit={handleSearch}>
          <p className="form-title">Направление</p>
          <div className="form-direction">
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="direction-here"
                placeholder="Откуда"
                value={citiesFromList.find(city => city._id === cityFromId)?.name || ''}
                onChange={handleCityFromChange}
              />
              <img 
                className={cityFromId ? 'vector invisible' : 'vector'} 
                src={vector} 
                alt="vector"
              />
              {citiesFromList.length > 0 && (
                <div className="direction-here-cities">
                  {citiesFromList.map(city => (
                    <div key={city._id} onClick={() => selectCityFrom(city)}>
                      {city.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              type="button" 
              className="btn button_reverse"
              onClick={swapCities}
            >
              <img src={icon_arrow} alt="swap cities" />
            </button>

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="direction-to"
                placeholder="Куда"
                value={citiesToList.find(city => city._id === cityToId)?.name || ''}
                onChange={handleCityToChange}
              />
              <img 
                className={cityToId ? 'vector vector-to invisible' : 'vector vector-to'} 
                src={vector} 
                alt="vector"
              />
              {citiesToList.length > 0 && (
                <div className="directiron-to-cities">
                  {citiesToList.map(city => (
                    <div key={city._id} onClick={() => selectCityTo(city)}>
                      {city.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <p className="form-title">Дата</p>
          <div style={{ display: 'flex', marginBottom: '92px' }}>
            <DatePicker 
              type="start" 
              value={form.date_start} 
            />
            <DatePicker 
              type="end" 
              value={form.date_end} 
            />
          </div>

          <button 
            type="submit" 
            className="btn button-find" 
            disabled={!isValid}
          >
            Найти билеты
          </button>
        </form>
      </div>
    </div>
  );
};

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