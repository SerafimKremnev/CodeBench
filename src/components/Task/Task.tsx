import React from 'react';
import styles from './Task.module.css'
import {Link} from "react-router-dom";

const Task = () => {
    return (
        <div className={styles.task}>
            <Link to={'/task/12345'}>Название задачи</Link>
            <p className={styles.description}>
                Описание задачи
                Описание задачи
                Описание задачи
                Описание задачи
                Описание задачи
            </p>
        </div>
    );
};

export default Task;