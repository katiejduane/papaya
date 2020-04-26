import React from "react";
import styles from "./Loader.module.css";

const loader = () => (
  <div className={styles.ldsRing}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default loader;
