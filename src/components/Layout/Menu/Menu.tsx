import React from 'react';
import {NavLink} from "react-router-dom";
import styles from './Menu.module.css';

const Menu = () => {
    return (
        <div className={styles.menu}>
            <NavLink className={styles.link} to={'/'}>Тест</NavLink>
            <NavLink className={styles.link} to={'/tasks'}>Задачи</NavLink>
        </div>
    );
};

export default Menu;