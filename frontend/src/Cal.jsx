import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useUser } from './userContext';
import styles from './Cal.module.css';
import null_image from './asset/logo.png'

function Cal() {
    const navigate = useNavigate();

    const { google_user, github_user } = useUser();

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div>
            <header className={styles.all}>
                <div className={styles['head-box']}>
                    <div className={styles['head-text']}><div className={styles['head-text-img']}></div><a href="/" className="click">오늘 뭐해?</a></div>
                      <div className={styles['header-right-text-box']}>
                          <div className={styles['header-right-text']} onClick={() => navigate("/login")}><div className={styles.click}>캘린더</div></div>
                          <div className={styles['header-right-text']} onClick={() => navigate("/login")}><div className={styles.click}>급식표</div></div>
                          <div className={styles['header-right-text']} onClick={() => navigate("/login")}><div className={styles.click}>시간표</div></div>
                      </div>
                  </div>
                  <div className={styles['header-right-image-box']}>
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
                    4월의 일정들
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
              </div>
            </section>
          </div>
    );
}

export default Cal;