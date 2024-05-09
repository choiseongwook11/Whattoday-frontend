import React, { useState, useEffect } from "react";
import styles from './Cal.module.css';
import { useCal } from "./calContext";

const Calendar = () => {
  const { currentMonth, currentYear, setCurrentMonth, setCurrentYear} = useCal();
  
  const [calendarDays, setCalendarDays] = useState([]);

  const [schedules, setSchedules] = useState({
    '2024-04-01': [
      { title: '지방기능경기'},
    ],
  });

  const months = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ];
  
  const formatNumber = (num) => (`0${num}`).slice(-2);

  useEffect(() => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    const renderCalendar = () => {
      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
      const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
      const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();
      const nextDays = 6 - new Date(currentYear, currentMonth + 1, 0).getDay();
  
      let days = [];
      
      for (let x = firstDay; x > 0; x--) {
        days.push(<div key={`prev${x}`} className={`${styles.day} ${styles.prev}`}><span>{prevLastDay - x + 1}</span></div>);
      }
  
      for (let i = 1; i <= lastDay; i++) {
        let dayClass = `${styles.day}`;
        const currentDate = `${currentYear}-${formatNumber(currentMonth + 1)}-${formatNumber(i)}`;
        const daySchedules = schedules[currentDate] || [];
        if (currentYear === todayYear && currentMonth === todayMonth && i === todayDate) {
          dayClass = `${styles.day}  ${styles.today}`;
        }
        const dayOfWeek = new Date(currentYear, currentMonth, i).getDay()
        if (dayOfWeek === 0) {
          dayClass = `${styles.day} ${styles.sun}`;
        }else if (dayOfWeek === 6) {
          dayClass = `${styles.day} ${styles.sat}`;
        }
        days.push(<div key={`current${i}`} className={dayClass}>
          <span>{i}</span>
          <div className={styles.schedule}>
          <div className={styles.personalschedulebackground}>
            <div className={styles.personalschedule}></div>
            <div className={styles.personalscheduleText}>지방기능...</div></div>
          {daySchedules.map((schedule, index) => (
            <div key={index} className={styles.schoolschedulebackground}>
              <div className={styles.schoolschedule}></div>
              <div div className={styles.schoolscheduleText}>{schedule.title.length >= 6 ? schedule.title : null}</div>
            </div>
          ))}
          
          </div>
          </div>);
      }
  
      for (let j = 1; j <= nextDays; j++) {
        days.push(<div key={`next${j}`} className={`${styles.day} ${styles.next}`}><span>{j}</span></div>);
      }
  
      setCalendarDays(days);
    };

    renderCalendar();
  }, [currentMonth, currentYear, schedules]);

  return (
    <div>
      <div className={styles['cal-mon-year']}>
        <div className={styles["angle-left"]} onClick={() => {
            if(currentMonth === 0) { // 1월에서 작년(12월)로 이동
              setCurrentMonth(11); // 12월로 설정
              setCurrentYear(currentYear - 1); // 년도 감소
            } else {
              setCurrentMonth(currentMonth - 1);
            }
          }}>
          <i className="xi-angle-left xi-x"></i>
        </div>
        <span>{currentYear}년 {months[currentMonth]}</span>
        <div className={styles["angle-right"]} onClick={() => {
            if(currentMonth === 11) { // 12월에서 내년(1월)로 이동
              setCurrentMonth(0); // 1월로 설정
              setCurrentYear(currentYear + 1); // 년도 증가
            } else {
              setCurrentMonth(currentMonth + 1);
            }
          }}>
          <i className="xi-angle-right xi-x"></i>
        </div>
      </div>
      <div className={styles.days}>
          
          
          
          {calendarDays}
        </div>
      </div>
    );

}

export default Calendar;
