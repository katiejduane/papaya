import React from "react";
import { Link } from "react-router-dom";

import Button from "../../components/UI/Button/Button";
import styles from "./Splash.module.css";

const splash = () => (
  <div className={styles.SplashContainer}>
    <h1 className={styles.SplashWelcome}>Welcome to Papaya</h1>
    <p className={styles.SplashAbout}>
      Because there's no such thing as "too many ideas", Papaya is an
      application for creative types with highly active imaginations. It's
      designed to help you manage your projects as they move through the
      creative process so you can simply focus on making beautiful things.
    </p>
    <div className={styles.ButtonContainer}>
      <Button btnClass="SwitchAuth">
        <Link to="/signup">Sign Up</Link>
      </Button>
      <Button btnClass="SwitchAuth">
        <Link to="/signin">Sign In</Link>
      </Button>
    </div>
  </div>
);

export default splash;
