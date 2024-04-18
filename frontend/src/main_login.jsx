import './main_login.css';
import { useNavigate } from 'react-router-dom';

function Main_login() {
    const navigate = useNavigate()
    return (
        <body>
            <header className="all">
                <div className="head-box">
                    <div className="head-text"><div className="head-text-img"></div><a href="/" className="click">오늘 뭐해?</a></div>
                    <div class="header-right-text-box">
                        <div className="header-right-text" onClick={() => navigate("/login")}><div className="click">캘린더</div></div>
                        <div className="header-right-text" onClick={() => navigate("/login")}><div className="click">급식표</div></div>
                        <div className="header-right-text" onClick={() => navigate("/login")}><div className="click">시간표</div></div>
                        <div className="header-right-text" onClick={() => navigate("/login")}><div className="click">마이페이지</div></div>
                    </div>
                </div>
            </header>
            <section className="all">
                <div className="main">
                    <div className="main-text">
                        <div className="main-text-ani">어서오세요!</div>
                        <div className="main-text-ani">저희 사이트에서 여러분들만의 캘린더를 만들어보세요!</div>
                        <div className="cal-button">
                            <div className="cal-text">
                                <div>캘린더로 이동</div>
                            </div>
                        </div>
                    </div>
                    <div class="main-icon">
                        <div class="img-icon"></div>
                    </div>
                </div>
            </section>
            <section className="all">
                <div className="sub-main">
                    <ul class="sc-list">
                        <li className="li-cal">
                            <div className="li-cal-text-box">
                                <div className="li-cal-title">
                                    캘린더
                                </div>
                                <div className="li-cal-text">
                                    학사 일정을 알려주고 원하는 날짜에 문구를 남기고 사진을 넣을 수 있습니다.
                                </div>
                            </div>
                        </li>
                        <li className="li-class">
                            <div className="li-class-text-box">
                                <div className="li-class-title">
                                    시간표
                                </div>
                                <div className="li-class-text">
                                    우리 반 시간표를 보여주고 그 날의 시간표를 왼쪽에 보여줍니다.
                                </div>
                            </div>
                        </li>
                        <li className="li-eat">
                            <div className="li-eat-text-box">
                                <div className="li-eat-title">
                                    급식표
                                </div>
                                <div className="li-eat-text">
                                    오늘의 급식을 보여주고 식단과 칼로리를 보여줍니다.
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
            <section className="all">
                <div className="sub2-main">
                </div>
            </section>
            <footer>
                <div className="footer-main">
                    <div class="footer-text">
                        <p>copyright all rights reserved.</p>
                    </div>

                </div>
            </footer>
        </body>
    );
}

export default Main_login;
