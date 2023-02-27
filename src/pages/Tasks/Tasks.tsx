import React from 'react';
import styles from './Tasks.module.css'
import TaskList from "../../components/TaskList/TaskList";

const Tasks = () => {
    return (
        <div className={styles.tasksPage}>
            <TaskList/>
        </div>
    );
};

export default Tasks;