import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useUser } from './userContext';
import styles from './Cal.module.css';
import null_image from './asset/logo.png';
import Calendar from './caljs'
import axios from 'axios';
import { useCal } from './calContext';
import { getAuth } from 'firebase/auth';
import CalModal from './CalModal';

function Cal() {
    const navigate = useNavigate();

    const { currentMonth } = useCal();

    const { google_user, github_user } = useUser();

    const [showDropdown, setShowDropdown] = useState(false);

    const [isOpen, setOpen] = useState(false);

    const handleLogout = () => {
      sessionStorage.clear();
      getAuth().signOut();
      navigate('/');
    };

    const handleClick = () => {
      setOpen(true);
    };
    
    return (
        <div>
            <header className={styles.all}>
                <div className={styles['head-box']}>
                    <div className={styles['head-text']}><div className={styles['head-text-img']}></div><a href="/mainlin" className="click">오늘 뭐해?</a></div>
                      <div className={styles['header-right-text-box']}>
                          <div className={styles['header-right-text']} onClick={() => {
                                        // npm i axios | yarn add axios
                                        axios.get("http://localhost:3001/data")
                                            .then((res) => {
                                                console.log(res);
                                                navigate("/Cal")
                                            }).catch((err) => {
                                                console.log(err);
                                            })}}><div className={styles.click}>캘린더</div></div>
                          <div className={styles['header-right-text']} onClick={() => navigate("/login")}><div className={styles.click}>급식표</div></div>
                          <div className={styles['header-right-text']} onClick={() => navigate("/login")}><div className={styles.click}>시간표</div></div>
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
                            <img className={styles['profile-image']} src={google_user?.photoURL == null && github_user?.photoURL == null ? null_image : google_user?.photoURL || github_user?.photoURL} alt='profile_image'></img>
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
                <div className={styles['cal-add-button']} onClick={handleClick}>
                  일정 추가
                  <CalModal isOpen={isOpen} />
                </div>
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