import React, {ReactNode} from 'react';
import styles from './Task.module.css'
import {Link} from "react-router-dom";

interface TaskProps {
    name: string,
    children: ReactNode,
    id: string
}
const Task = ({children, name, id}: TaskProps) => {

    return (
        <div className={styles.task}>
            <Link className={styles.link} to={`/tasks/${id}`}>{name}</Link>
            <p className={styles.description}>
                {children}
            </p>
        </div>
    );
};

export default Task;