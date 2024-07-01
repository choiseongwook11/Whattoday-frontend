import React, { useState, useEffect } from 'react';
import styles from './MyPage.module.css';
import { useNavigate } from 'react-router-dom';
import null_image from './asset/no-image.svg'
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import Select from 'react-select';
import './MyPage.css'

const MyPage = () => {
    const navigate = useNavigate();

    const githubUserPhotoURL = sessionStorage.getItem('githubUserPhotoURL');
    const googleUserPhotoURL = sessionStorage.getItem('googleUserPhotoURL');

    const googleUsername = sessionStorage.getItem('googleUsername')
    const githubUsername = sessionStorage.getItem('githubUsername')

    const [showDropdown, setShowDropdown] = useState(false);

    const [modal, setModal] = useState(false);

      const [offices, setOffices] = useState([
        { value: 'K10', label: '강원도교육청' },
        { value: 'F10', label: '광주광역시교육청' },
        { value: 'D10', label: '대구광역시교육청' },
        { value: 'G10', label: '대전광역시교육청' },
        { value: 'I10', label: '경기도교육청' },
        { value: 'R10', label: '경상북도교육청' },
        { value: 'S10', label: '경상남도교육청' },
        { value: 'M10', label: '충청북도교육청' },
        { value: 'N10', label: '충청남도교육청' },
        { value: 'E10', label: '인천광역시교육청' },
        { value: 'H10', label: '울산광역시교육청' },
        { value: 'B10', label: '서울특별시교육청' },
        { value: 'P10', label: '전북특별자치도교육청' },
        { value: 'Q10', label: '전라남도교육청' },
        { value: 'C10', label: '부산광역시교육청' },
        { value: 'T10', label: '제주특별자치도교육청' },
        { value: 'J10', label: '세종특별자치시교육청' },
      ]);

      const [selectedOffice, setSelectedOffice] = useState(null);
      const [schools, setSchools] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const [hasMore, setHasMore] = useState(true);
      const [selectedSchool, setSelectedSchool] = useState(null);

    const handleLogout = () => {
      sessionStorage.clear();
      getAuth().signOut();
      navigate('/');
    };

    const toggleModal = () => {
      setModal(!modal);
    };
  
    useEffect(() => {
      if (selectedOffice) {
        fetchSchools(selectedOffice.value, 1);
      }
    }, [selectedOffice]);
  
    const fetchSchools = async (office, page) => {
      try {
        const response = await axios.post('http://localhost:3001/getSchools', { office, page, limit: 100 });
        if (page === 1) {
          setSchools(response.data);
        } else {
          setSchools((prevSchools) => [...prevSchools, ...response.data]);
        }
        setHasMore(response.data.length === 100);
        setCurrentPage(page + 1);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        setHasMore(false);
      }
    };
  
    const handleMoreSchools = () => {
      if (hasMore) {
        fetchSchools(selectedOffice.value, currentPage);
      }
    };
  
    const handleOfficeChange = (selectedOption) => {
      setSelectedOffice(selectedOption);
      setSchools([]);
      setCurrentPage(1);
      setHasMore(true);
    };
  
    const handleSchoolChange = (selectedOption) => {
      if (selectedOption && selectedOption.value === 'more') {
        handleMoreSchools();
        setSelectedSchool(null);
      } else {
        setSelectedSchool(selectedOption);
      }
    };
  
    const schoolOptions = [
      ...schools.map((school) => ({ value: school.학교명, label: school.학교명 })),
      ...(hasMore ? [{ value: 'more', label: '더보기...' }] : [])
    ];

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
                      <div className={styles['main-profile-box']}>
                        <img className={styles['main-profile-image']} src={googleUserPhotoURL === null && githubUserPhotoURL === null ? null_image : googleUserPhotoURL || githubUserPhotoURL} alt='profile_image'></img>
                      </div>
                      <div className={styles['main-profile-name']}>
                          {googleUsername === null && ( githubUsername === null || githubUsername === "null" ) ? "닉네임" : googleUsername || githubUsername}<span>{googleUsername === null && (githubUsername === null || githubUsername === "null") ? "" : "님"}</span>
                      </div>
                      <div className={styles['center-line']}>
                        
                      </div>
                    <div className={styles['main-name']}>
                            <span>Name</span>
                        <div className={styles['horizontal-line']}></div>
                            </div>
                        <div className={styles['main-school']}>
                            <span>School</span>
                            <div className={styles['school-button']}>
                            <div className={styles['click']} onClick={toggleModal}><div className={styles['school-select-button']}>학교검색</div></div>
                            {modal &&(
                              <div className={styles.modal}>
                                <div className={styles.overlay}>
                                  <div className={styles['modal-content']}>
                                    <div className={styles['school-change']}>
                                      <div className={styles['school-change-container']}>
                                      <label htmlFor="Office" className={styles.Officename}>교육청명:</label>
      <Select
        name="Office"
        options={offices}
        onChange={handleOfficeChange}
        className="Office"
        classNamePrefix="Office"
        value={selectedOffice}
        placeholder="--교육청을 선택해주세요--"
      />

      <label htmlFor="school" className={styles.schoolname}>학교명:</label>
      <Select
        name="school"
        options={schoolOptions}
        onChange={handleSchoolChange}
        className="school"
        classNamePrefix="school"
        value={selectedSchool}
        placeholder="--학교를 선택해주세요--"
        isSearchable
      />
                                        </div>
                                    <div className={styles['school-info-container']}>
                                      <label htmlFor="grade" className={styles.gradename}>학년:</label>
                                      <select name="grade" className={styles.grade}>
                                        <option value="" disabled selected>학년</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                      </select>
                                      <label htmlFor="class" className={styles.classname}>반:</label>
                                      <select name="class" className={styles.class}>
                                        <option value="" disabled selected>반</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                      </select>
                                        <label htmlFor="num" className={styles.numname}>번호:</label>
                                        <select name="num" className={styles.num}>
                                          <option value="" disabled selected>번호</option>
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                          <option value="4">4</option>
                                          <option value="5">5</option>
                                          <option value="6">6</option>
                                          <option value="7">7</option>
                                          <option value="8">8</option>
                                          <option value="9">9</option>
                                          <option value="10">10</option>
                                          <option value="11">11</option>
                                          <option value="12">12</option>
                                          <option value="13">13</option>
                                          <option value="14">14</option>
                                          <option value="15">15</option>
                                          <option value="16">16</option>
                                          <option value="17">17</option>
                                          <option value="18">18</option>
                                          <option value="19">19</option>
                                          <option value="20">20</option>
                                          <option value="21">21</option>
                                          <option value="22">22</option>
                                          <option value="23">23</option>
                                          <option value="24">24</option>
                                          <option value="25">25</option>
                                          <option value="26">26</option>
                                          <option value="27">27</option>
                                          <option value="28">28</option>
                                          <option value="29">29</option>
                                          <option value="30">30</option>
                                        </select>
                                      </div>
                                    </div>
                                      <div className={styles.btn}>
                                        <button onClick={toggleModal} className={styles.save}><div className={styles.savetext}>저장</div></button>
                                        <button onClick={toggleModal} className={styles.cancel}><div className={styles.canceltext}>취소</div></button>
                                      </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            </div>
                        <div className={styles['horizontal-school-line']}></div>
                            </div>
                        <div className={styles['main-class']}>
                            <span>Class</span>
                        <div className={styles['horizontal-line']}></div>
                    </div>
                      <div className={styles['bottom-button']}>
                      <div className={styles['click']}><div className={styles['cancel-button']}>취소</div></div>
                        <div className={styles['click']}><div className={styles['apply-button']}>확인</div></div>
                      </div>
                  </div>
                </div>
            </section>
        </div>
    );
}

export default MyPage;
