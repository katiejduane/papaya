import React from 'react';
import styles from './Loader.module.css';

const loader = () => (
    <div className={styles.LoaderContainer}>
        <div className={styles.Loader}>Loading...</div>
    </div>
);

export default loader;