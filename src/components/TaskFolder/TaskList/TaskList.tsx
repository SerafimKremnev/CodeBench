import React from 'react';
import Task from "../Task/Task";
import styles from './TaskList.module.css'
import tasks from '../../../store/TasksState'
const TaskList = (): JSX.Element => {
    return (
        <div className={styles.taskList}>
            {tasks.tasks.map(e => <Task id={e.id} name={e.name}>{e.description}</Task>)}
        </div>
    )

};

export default TaskList;