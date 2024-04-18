import './loginmain.css';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { firebaseConfig } from './config/firebase-config';

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

function LoginMain() {
      const navigate = useNavigate();

      const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((userCred) => {
            console.log(userCred);
            navigate('/mainlin');
          })
          .catch((error) => {
            console.error("Login failed:", error); // 에러 처리
          });
      };

      const loginWithGithub = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
          .then((userCred) => {
            console.log(userCred);
            navigate('/mainlin');
          })
          .catch((error) => {
            console.error("Login failed:", error); // 에러 처리
          });
      };

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
                              <div className="google-logo"  onClick={loginWithGoogle}>
                                  <div className="logo-text"><div className="click">Google</div></div>
                              </div>
                              <div className="github-logo" onClick={loginWithGithub}>
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
