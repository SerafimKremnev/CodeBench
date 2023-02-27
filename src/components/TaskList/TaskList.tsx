import React from 'react';
import Task from "../Task/Task";
import styles from './TaskList.module.css'

const TaskList = (): JSX.Element => {
    // const testArr: JSX.Element[] = new Array(4).fill(<></>)
    return (
        <div className={styles.taskList}>
            <Task id={36712389} name={"Возведите в степень"}>Напишите функци возведения в степень</Task>
        </div>
    )

};

export default TaskList;