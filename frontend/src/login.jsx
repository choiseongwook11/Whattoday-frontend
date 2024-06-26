import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, setPersistence, browserSessionPersistence } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config/firebase-config';
import { useUser } from './userContext';
import styles from "./loginmain.module.css"

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SocialLogin = () => {
  const navigate = useNavigate();
  const { setGoogleUser, setGithubUser } = useUser();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithPopup(auth, provider)
          .then((userCred) => {
            const google_user = userCred.user;
            setGoogleUser(google_user);
            sessionStorage.setItem('googlelogincheck', google_user)
            sessionStorage.setItem('googleUserPhotoURL', google_user.photoURL);
            sessionStorage.setItem('googleUseremail', google_user.email);
            navigate('/mainlin');
          })
          .catch((error) => {
            console.error("Google Login failed:", error);
          });
      });
  };

  const loginWithGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCred) => {
        const github_user = userCred.user;
        setGithubUser(github_user);
        sessionStorage.setItem('githublogincheck', github_user)
        sessionStorage.setItem('githubUserPhotoURL', github_user.photoURL);
        sessionStorage.setItem('githubUseremail', github_user.email);
        navigate('/mainlin');
      })
      .catch((error) => {
        console.error("Github Login failed:", error);
      });
  };

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <div className={styles["main-login-text-box-right"]}>
      <div className={styles["logo-container"]}>
        <div className={styles["github-logo"]} onClick={loginWithGithub}>
          <div className={styles["logo-text"]}>Github</div>
        </div>
        <div className={styles["ban"]}></div>
        <div className={styles["google-logo"]} onClick={loginWithGoogle}>
          <div className={styles["logo-text"]}>Google</div>
        </div>
      </div>
    </div>
  );
};
export default SocialLogin;
