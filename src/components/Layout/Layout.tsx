import React from 'react';
import {Outlet} from "react-router-dom";
import styles from './Layout.module.css';
import Header from "./Header/Header";


const Layout = () => {
    return (
        <div className={styles.wrapper}>
            <Header/>
            <div className={styles.body}>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;