import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './Cal.module.css';

const YEARS = Array.from({ length: getYear(new Date()) + 1 - 2000 }, (_, i) => getYear(new Date()) - i);
const MONTHS = [
  "1월", "2월", "3월", "4월", "5월", "6월",
  "7월", "8월", "9월", "10월", "11월", "12월"
];

const Datapicker = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <div className={styles.datePickerWrapper}>
      <DatePicker
        dateFormat="yyyy-MM-dd"
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
        showYearDropdown
        scrollableYearDropdown
        shouldCloseOnSelect
        yearDropdownItemNumber={100}
        minDate={new Date('2000-01-01')}
        maxDate={new Date('2030-01-01')}
        selected={selectedDate}
        calendarClassName={styles.calenderWrapper}
        dayClassName={(d) => (d.getDate() === selectedDate?.getDate() ? styles.selectedDay : styles.unselectedDay)}
        onChange={handleChange}
        className={styles.datePicker}
        renderCustomHeader={({
          date,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={styles.customHeaderContainer}>
            <div>
              <span className={styles.month}>{MONTHS[getMonth(date)]}</span>
              <select
                value={getYear(date)}
                className={styles.year}
                onChange={({ target: { value } }) => changeYear(+value)}
              >
                {YEARS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="button"
                onClick={decreaseMonth}
                className={styles.monthButton}
                disabled={prevMonthButtonDisabled}
              >
                <ArrowBackIosNewIcon style={{ color: '#ffffff' }} />
              </button>
              <button
                type="button"
                onClick={increaseMonth}
                className={styles.monthButton}
                disabled={nextMonthButtonDisabled}
              >
                <ArrowForwardIosIcon style={{ color: '#ffffff' }} />
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Datapicker;
