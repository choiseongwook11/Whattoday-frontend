import './loginmain.css';
import { useNavigate } from 'react-router-dom';

function LoginMain() {
    const navigate = useNavigate()
    return (
        <body>
            <section className="all">
                <div className="main-box">
                    <div className="main-login-box">
                        <div className="back-text"><a href="/" className="click"><i class="fa-solid fa-arrow-left"></i></a></div>
                        <div className="main-login-text-box-left">
                            <div className="main-login-title">
                                반가워요!
                            </div>
                            <div className="main-login-text">
                                로그인해서 저희 서비스를 이용해보세요
                            </div>
                        </div>
                        <div class="main-login-text-box-right">
                            <div className="google-logo"  onClick={() => navigate("/mainlin")}>
                                <div className="logo-text"><div className="click">Google</div></div>
                            </div>
                            <div className="github-logo"  onClick={() => navigate("/mainlin")}>
                                <div className="logo-text"><div className="click">Github</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </body>
    );
}

export default LoginMain;
