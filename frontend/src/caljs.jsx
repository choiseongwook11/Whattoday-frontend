import React, { useState, useEffect } from "react";
import styles from './Cal.module.css';
import { useCal } from "./calContext";
import axios from "axios";

const Calendar = () => {
  const { currentMonth, currentYear, setCurrentMonth, setCurrentYear } = useCal();
  
  const [calendarDays, setCalendarDays] = useState([]);
  const [schoolSchedules, setSchoolSchedules] = useState({});
  const [personalSchedules, setPersonalSchedules] = useState({});

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const initialDate = new Date();
    return isNaN(initialDate.getTime()) ? new Date() : initialDate;
  });

  const [diaryEntries, setDiaryEntries] = useState({});

  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  const months = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ];

  const processScheduleData = (data, isPersonal = false) => {
    return data.reduce((acc, curr) => {
      const dateKey = isPersonal ? curr.calendar_date : curr.AA_YMD; // 'YYYYMMDD' 형식
      const title = isPersonal ? curr.calendar_name : curr.EVENT_NM;
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push({ title });
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchSchoolSchedules = async () => {
      try {
        const response = await axios.get("http://localhost:3001/schooldata");
        const data = response.data.SchoolSchedule[1].row;
        const schedulesByDate = processScheduleData(data);
        setSchoolSchedules(schedulesByDate);
      } catch (error) {
        console.error("일정 데이터를 불러오는데 실패했습니다.", error);
      }
    };

    const fetchPersonalSchedules = async () => {
      try {
        const response = await axios.get("http://localhost:3001/personaldata");
        const schedulesByDate = processScheduleData(response.data, true);
        setPersonalSchedules(schedulesByDate);
      } catch (error) {
        console.error("개인 일정을 불러오는데 실패했습니다.", error);
      }
    };

    fetchSchoolSchedules();
    fetchPersonalSchedules();
  }, []);

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
        const currentDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`.replace(/-/g, ''); 
        const schoolDaySchedules = schoolSchedules[currentDate] || [];
        const personalDaySchedules = personalSchedules[currentDate] || [];

        if (currentYear === todayYear && currentMonth === todayMonth && i === todayDate) {
          dayClass = `${styles.day}  ${styles.today}`;
        }
        
        const dayOfWeek = new Date(currentYear, currentMonth, i).getDay();
        if (dayOfWeek === 0) {
          dayClass = `${styles.day} ${styles.sun}`;
        } else if (dayOfWeek === 6) {
          dayClass = `${styles.day} ${styles.sat}`;
        }

        days.push(
          <div key={`current${i}`} className={dayClass} onClick={() => handleDayClick(i)}>
            <span>{i}</span>
            <div className={styles.schedule}>
              {schoolDaySchedules.map((schedule, index) => {
                if (schedule.title === "토요휴업일") return null;
                const scheduleTitle = schedule.title === "기독탄신일(성탄절)" ? "성탄절" : schedule.title;
                const schoolScheduleDisplay = scheduleTitle.length >= 6 ? scheduleTitle.slice(0, 4) + "..." : scheduleTitle;
                return (
                  <div key={index} className={styles.schoolschedulebackground}>
                    <div className={styles.schoolschedule}></div>
                    <div className={styles.schoolscheduleText}>{schoolScheduleDisplay}</div>
                  </div>
                );
              })}
              {personalDaySchedules.map((schedule, index) => {
                const personalScheduleDisplay = schedule.title.length >= 6 ? schedule.title.slice(0, 4) + "..." : schedule.title;
                return (
                  <div key={index} className={styles.personalschedulebackground}>
                    <div className={styles.personalschedule}></div>
                    <div className={styles.personalscheduleText}>{personalScheduleDisplay}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
  
      for (let j = 1; j <= nextDays; j++) {
        days.push(<div key={`next${j}`} className={`${styles.day} ${styles.next}`}><span>{j}</span></div>);
      }
  
      setCalendarDays(days);
    };

    renderCalendar();
  }, [currentMonth, currentYear, schoolSchedules, personalSchedules]);

  const formatDate = (date, forUpload = false) => {
    if (!date || isNaN(date.getTime())) {
        date = new Date(); // 기본값 설정
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    if (forUpload) {
        return `${year}-${month}-${day}`;
    } else {
        return `${year}년 ${month}월 ${day}일`;
    }
};


  
  const handleDayClick = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(selectedDate);
    setModalOpen(true);
  };
  

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  const handleDiaryChange = (event) => {
        const formattedDate = formatDate(selectedDate);
        setDiaryEntries({
            ...diaryEntries,
            [formattedDate]: event.target.value
        });
    };

  const onUpload = async (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const formData = new FormData();
        const date = selectedDate && !isNaN(selectedDate.getTime()) ? selectedDate : new Date();
        formData.append('file', file);
        formData.append('date', formatDate(date, true));

          try {
              setLoading(true);
              const response = await axios.post('http://localhost:3001/upload', formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
              });
              console.log('File uploaded successfully:', response.data);
              localStorage.setItem('modalOpen', 'true'); // 모달 상태를 로컬 스토리지에 저장
              window.location.reload();
          } catch (error) {
              console.error('Error uploading file:', error);
          } finally {
            setLoading(false);
          }
      }
  };

  const fetchImageForDate = async (date) => {
    try {
        setLoading(true);
        const formattedDate = formatDate(date, true);
        const response = await axios.get(`http://localhost:3001/image?date=${formattedDate}`);
        setImageSrc(response.data.imagePath);
    } catch (error) {
        console.error('Error fetching image:', error);
        setImageSrc(null);  // 이미지가 없을 경우 초기화
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (modalOpen) {
        fetchImageForDate(selectedDate);
    }
  }, [selectedDate, modalOpen]);

  useEffect(() => {
    const modalState = localStorage.getItem('modalOpen');
    if (modalState === 'true') {
        setModalOpen(true);
        localStorage.removeItem('modalOpen'); // 모달 상태를 가져온 후 삭제
    }
  }, []);

  return (
    <div>
      <div className={styles['cal-background-height']}>
        <div className={styles['cal-mon-year']}>
          <div className={styles["angle-left"]} onClick={() => {
            if(currentMonth === 0) {
              setCurrentMonth(11);
              setCurrentYear(currentYear - 1);
            } else {
              setCurrentMonth(currentMonth - 1);
            }
          }}>
            <i className="xi-angle-left xi-x"></i>
          </div>
          <span>{currentYear}년 {months[currentMonth]}</span>
          <div className={styles["angle-right"]} onClick={() => {
            if(currentMonth === 11) {
              setCurrentMonth(0);
              setCurrentYear(currentYear + 1);
            } else {
              setCurrentMonth(currentMonth + 1);
            }
          }}>
            <i className="xi-angle-right xi-x"></i>
          </div>
        </div>
        {modalOpen && (
          <Modal onClose={closeModal}>
              <div className={styles['Diary-background']}>
                  {imageSrc && <img width="100%" src={`http://localhost:3001${imageSrc}`} alt="Preview" className={styles.image} />}
                  <input 
                      className={styles.diaryinput}
                      accept="image/*"
                      multiple={false}
                      type="file"
                      onChange={onUpload}
                  />
                  <div className={styles['Diary-date-modal']}>
                      {formatDate(selectedDate)}
                  </div>
                  <textarea 
                      className={styles.diary}
                      value={diaryEntries[formatDate(selectedDate, true)] || ''}
                      onChange={handleDiaryChange}
                      placeholder="다이어리 내용을 입력하세요"
                  />
              </div>
          </Modal>
        )}
        <div className={styles.days}>
          {calendarDays}
        </div>
      </div>
    </div>
  );
}

const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Calendar;
