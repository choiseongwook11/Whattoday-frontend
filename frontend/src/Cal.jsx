import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './Cal.module.css';
import null_image from './asset/logo.png';
import Calendar from './caljs'
import { useCal } from './calContext';
import { getAuth } from 'firebase/auth';
import Datapicker from './datepicker'
import axios from 'axios';

function Cal() {
    const navigate = useNavigate();

    const { currentMonth } = useCal();

    const [calendarName, setCalendarName] = useState('');

    const [calendarDate, setCalendarDate] = useState('');

    const [showDropdown, setShowDropdown] = useState(false);

    const [modal, setModal] = useState(false);

    const githubUserPhotoURL = sessionStorage.getItem('githubUserPhotoURL');
    const googleUserPhotoURL = sessionStorage.getItem('googleUserPhotoURL');

    const handleLogout = () => {
      sessionStorage.clear();
      getAuth().signOut();
      navigate('/');
    };
  
    const toggleModal = () => {
      setModal(!modal);
    };
  
    const handleAddSchedule = async () => {
      try {
        const response = await axios.post('http://124.63.142.219:3001/personal-addschedule', {
          calendar_name: calendarName,
          calendar_date: calendarDate,
        });
        console.log(response.data);

        if(response.status === 200) {
          window.location.reload();
        } else {
          alert("일정 추가에 실패했습니다.");
        }

      } catch (error) {
        console.error('Error adding schedule:', error);
      }
      toggleModal();
    };
  
    useEffect(() => {
      if (modal) {
        document.body.classList.add(styles['active-modal']);
      } else {
        document.body.classList.remove(styles['active-modal']);
      }
    }, [modal]);

    return (
        <div>
            <header className={styles.all}>
                <div className={styles['head-box']}>
                    <div className={styles['head-text']} onClick={() => navigate("/mainlin")}><div className={styles['head-text-img']}></div><div className={styles.click}>오늘 뭐해?</div></div>
                      <div className={styles['header-right-text-box']}>
                          <div className={styles['header-right-text']} onClick={() => navigate("/Cal")}><div className={styles.click}>캘린더</div></div>
                          <div className={styles['header-right-text']} onClick={() => navigate("/Eat")}><div className={styles.click}>급식표</div></div>
                          <div className={styles['header-right-text']} onClick={() => navigate("/Schedule")}><div className={styles.click}>시간표</div></div>
                      </div>
                  </div>
                  <div className={styles['header-right-image-box']}>
                  {showDropdown &&(
                  <div className={styles['profile-menu']}>
                        <div className={styles["profile-menu-item"]} onClick={() => navigate('/MyPage')}>
                            프로필 보기
                        </div>
                        <div className={styles["profile-menu-item"]} onClick={handleLogout}>
                              로그아웃
                        </div>
                      </div>  
                    )}
                    <div className={styles['header-right-profile']} onClick={() => setShowDropdown(!showDropdown)}><div className={styles.click}>
                          <div className={styles['profile-box']}>
                            <img className={styles['profile-image']} src={googleUserPhotoURL == null && githubUserPhotoURL == null ? null_image : googleUserPhotoURL || githubUserPhotoURL} alt='profile_image'></img>
                          </div>
                        </div>
                      </div>
                </div>
            </header>
            <section>
            <div className={styles['cal-schedule']}>
              <div className={styles['cal-mon-schedule']}> 
              {currentMonth + 1}월의 일정들
                  </div>
                  <div className={styles['cal-school-schedule-text']}>
                    학사일정
                  </div>
                  <div className={styles['cal-school-schedule-bar']}></div>
                  <div className={styles['cal-school-schedule']}>
                    <div className={styles['cal-school-schedule-date']}>
                      4.1 ~ 5
                    </div>
                    <div className={styles['cal-school-schedule-name']}>
                      지방기능경기대회
                    </div>
                  </div>
                  <div className={styles['cal-school-schedule2']}>
                    <div className={styles['cal-school-schedule-date']}>
                      4.2 ~ 4
                    </div>
                    <div className={styles['cal-school-schedule-name']}>
                      중학교 영어듣기
                    </div>
                  </div>
                  <div className={styles['cal-school-schedule3']}>
                    <div className={styles['cal-school-schedule-date']}>
                      4.9 ~ 12
                    </div>
                    <div className={styles['cal-school-schedule-name']}>
                      고등학교 영어듣기
                    </div>
                  </div>
                  <div className={styles['cal-personal-schedule-text']}>
                    개인일정
                  </div>
                  <div className={styles['cal-personal-schedule-bar']}></div>
                  <div className={styles['cal-personal-schedule']}>
                    <div className={styles['cal-personal-schedule-date']}>
                      4.2 ~ 4
                    </div>
                    <div className={styles['cal-personal-schedule-name']}>
                      캡스톤 계획 발표
                    </div>
                  </div>
                  <div className={styles['cal-personal-schedule2']}>
                    <div className={styles['cal-personal-schedule-date']}>
                      4.2
                    </div>
                    <div className={styles['cal-personal-schedule-name']}>
                      승환이 생일
                    </div>
                  </div>
              </div>
              <div className={styles['cal-background']}>
                <div className={styles['cal-add-button']} onClick={toggleModal}>
                  일정 추가
                </div>
                {modal &&(
                  <div className={styles.modal}>
                    <div className={styles.overlay}>
                      <div className={styles['modal-content']}>
                        <div className={styles['modal-title']}>일정 추가하기</div>
                        <div className={styles['modal-sc-name']}>일정 이름</div>
                        <div className={styles['modal-sc-name-div']}>
                        <input
                          className={styles['modal-sc-name-input']}
                          maxLength="12"
                          type="text"
                          value={calendarName}
                          onChange={(e) => setCalendarName(e.target.value)}
                        /></div>
                        <div className={styles['modal-sc-date']}>날짜</div>
                        <div className={styles['modal-sc-date-div']}>
                          <Datapicker onChange={(date) => setCalendarDate(date)}/>
                        </div>
                        <button onClick={handleAddSchedule} className={styles.check}><div className={styles.checktext}>추가</div></button>
                        <button onClick={toggleModal} className={styles.cancel}><div className={styles.canceltext}>취소</div></button>
                      </div>
                    </div>
                  </div>
                )}
                  <div className={styles.weekdays}>
                    <div className={styles.day}><span className={styles.sun}>일</span></div>
                    <div className={styles.day}><span className={styles.onweek}>월</span></div>
                    <div className={styles.day}><span className={styles.onweek}>화</span></div>
                    <div className={styles.day}><span className={styles.onweek}>수</span></div>
                    <div className={styles.day}><span className={styles.onweek}>목</span></div>
                    <div className={styles.day}><span className={styles.onweek}>금</span></div>
                    <div className={styles.day}><span className={styles.sat}>토</span></div>
                  </div>
                    <Calendar />
              </div>
            </section>
          </div>
    );
}

export default Cal;