import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import null_image from './asset/logo.png'
import { getAuth } from 'firebase/auth';
import styles from "./loginTest.module.css"

const LoginTest = () => {
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
                      <div className={styles['header-right-text']} onClick={() => navigate("/Eat")}><div className={styles.click}>급식표</div></div>
                      <div className={styles['header-right-text']} onClick={() => navigate("/Schedule")}><div className={styles.click}>시간표</div></div>
                  </div>
              </div>
              <div className={styles['header-right-image-box']}>
                <div className={styles['header-right-profile']} onClick={() => setShowDropdown(!showDropdown)}><div className={styles.click}>
                      <div className={styles['profile-box']}>
                        <img className={styles['profile-image']} src={googleUserPhotoURL == null && githubUserPhotoURL == null ? null_image : googleUserPhotoURL || githubUserPhotoURL} alt='profile_image'></img>
                      </div>
                    </div>
                  </div>
              </div>
          </header>
          <section className={styles['main-all']}>
              <div className={styles['main-background']}>
                <div className={styles['main-box']}>
                {showDropdown && (
                    <div className={styles['profile-menu']}>
                      <div class={styles["profile-menu-item"]} onClick={() => navigate('/MyPage')}>
                          프로필 보기
                      </div>
                      <div class={styles["profile-menu-item"]} onClick={handleLogout}>
                          로그아웃
                      </div>
                    </div>
                )}
                </div>
              </div>
          </section>
        </div>
  );
}

export default LoginTest;