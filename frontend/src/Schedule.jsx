import React, { useState } from 'react';
import styles from './schedule.module.css';
import { useNavigate } from 'react-router-dom';
import null_image from './asset/no-image.svg'
import { getAuth } from 'firebase/auth';

const Schedule = () => {
    const navigate = useNavigate();

    const githubUserPhotoURL = sessionStorage.getItem('githubUserPhotoURL');
    const googleUserPhotoURL = sessionStorage.getItem('googleUserPhotoURL');

    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        sessionStorage.clear();
        getAuth().signOut();
        navigate('/');
    };

    return (
        <div>
            <header className={styles.all}>
                <div className={styles['head-box']}>
                    <div className={styles['head-text']}>
                    <div className={styles["head-text-img"]}></div>
                    <a href="/mainlin" className={styles.click}>오늘 뭐해?</a>
                </div>
                    <div className={styles['header-right-text-box']}>
                        <div className={styles['header-right-text']} onClick={() => navigate("/Cal")}><div className={styles.click}>캘린더</div></div>
                        <div className={styles['header-right-text']} onClick={() => navigate("/login")}><div className={styles.click}>급식표</div></div>
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
            <section className={styles.all}>
            <div className={styles['schedule-background']}>
              <div className={styles['table-box']}>
                <table>
                    <thead>
                        <tr>
                          <th>시간</th>
                          <th>월</th>
                          <th>화</th>
                          <th>수</th>
                          <th>목</th>
                          <th>금</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>1교시</td>
                          <td className={styles.bottom}>표 내용1</td>
                          <td className={styles.bottom}>표 내용1</td>
                          <td className={styles.bottom}>표 내용1</td>
                          <td className={styles.bottom}>표 내용1</td>
                          <td className={styles.bottom}>표 내용1</td>
                      </tr>
                      <tr>
                          <td>2교시</td>
                          <td className={styles.bottom}>표 내용2</td>
                          <td className={styles.bottom}>표 내용2</td>
                          <td className={styles.bottom}>표 내용2</td>
                          <td className={styles.bottom}>표 내용2</td>
                          <td className={styles.bottom}>표 내용2</td>
                      </tr>
                      <tr>
                          <td>3교시</td>
                          <td className={styles.bottom}>표 내용3</td>
                          <td className={styles.bottom}>표 내용3</td>
                          <td className={styles.bottom}>표 내용3</td>
                          <td className={styles.bottom}>표 내용3</td>
                          <td className={styles.bottom}>표 내용3</td>
                      </tr>
                      <tr>
                          <td>4교시</td>
                          <td className={styles.bottom}>표 내용4</td>
                          <td className={styles.bottom}>표 내용4</td>
                          <td className={styles.bottom}>표 내용4</td>
                          <td className={styles.bottom}>표 내용4</td>
                          <td className={styles.bottom}>표 내용4</td>
                      </tr>
                      <tr>
                          <td>점심시간</td>
                          <td className={styles.bottom}>표 내용5</td>
                          <td className={styles.bottom}>표 내용5</td>
                          <td className={styles.bottom}>표 내용5</td>
                          <td className={styles.bottom}>표 내용5</td>
                          <td className={styles.bottom}>표 내용5</td>
                      </tr>
                      <tr>
                        <td>5교시</td>
                        <td className={styles.bottom}>표 내용5</td>
                        <td className={styles.bottom}>표 내용5</td>
                        <td className={styles.bottom}>표 내용5</td>
                        <td className={styles.bottom}>표 내용5</td>
                        <td className={styles.bottom}>표 내용5</td>
                      </tr>
                      <tr>
                        <td>6교시</td>
                        <td className={styles.bottom}>표 내용5</td>
                        <td className={styles.bottom}>표 내용5</td>
                        <td className={styles.bottom}>표 내용5</td>
                        <td className={styles.bottom}>표 내용5</td>
                        <td className={styles.bottom}>표 내용5</td>
                      </tr>
                      <tr>
                          <td>7교시</td>
                          <td className={[`${styles.bottom} ${styles.shadow}`]}>푸터1</td>
                          <td className={styles.bottom}>푸터1</td>
                          <td className={styles.bottom}>푸터1</td>
                          <td className={styles.bottom}>푸터1</td>
                          <td className={styles.bottom}>푸터1</td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
    );
}

export default Schedule;
