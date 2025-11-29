import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useDispatch } from 'react-redux';
import { setDateStart, setDateEnd } from '../redux/slice/trainSlice';

function DatePicker({ type = 'start', value, onChange }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    
    if (type === 'start') {
      dispatch(setDateStart(formattedDate));
    } else {
      dispatch(setDateEnd(formattedDate));
    }
    
    if (onChange) {
      onChange(formattedDate);
    }
    setShowCalendar(false);
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <div className="form-data" style={{ position: 'relative' }}>
      <input
        type="text"
        className={type === 'start' ? 'direction-here-data' : 'direction-back-data'}
        value={formatDisplayDate(value)}
        readOnly
        onClick={() => setShowCalendar(!showCalendar)}
        placeholder={type === 'start' ? 'ДД/ММ/ГГ' : 'ДД/ММ/ГГ'}
      />
      <button 
        type="button" 
        className={type === 'start' ? 'button-data' : 'button-data-back'}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        📅
      </button>
      
      {showCalendar && (
        <div className={type === 'start' ? 'calendar' : 'calendar_back'}>
          <Calendar
            onChange={handleDateChange}
            value={value ? new Date(value) : new Date()}
            minDate={new Date()}
            className="react-calendar"
          />
        </div>
      )}
    </div>
  );
}

export default DatePicker;