import React from 'react';
import Task from "../Task/Task";
import styles from './TaskList.module.css'
import tasks from '../../store/TasksState'
const TaskList = (): JSX.Element => {
    return (
        <div className={styles.taskList}>
            {tasks.tasks.map(e => <Task id={e.id} name={e.name}>Напишите функци возведения в степень</Task>)}
        </div>
    )

};

export default TaskList;