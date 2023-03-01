import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styles from './TaskPage.module.css';
import tasks from '../../store/TasksState';
import {observer} from "mobx-react-lite";
import Buttons from "../../components/TaskFolder/page/Buttons";
import EditorBox from "../../components/TaskFolder/page/EditorBox";
import TaskName from "../../components/TaskFolder/page/TaskName";
import ConsoleBox from "../../components/TaskFolder/page/ConsoleBox";
import {taskWorker_script} from "../../components/TaskFolder/taskWorker";


const Tasks = observer(() => {
    const {id} = useParams();
    const currentTask = tasks.tasks.find(e => e.id == id)
    const worker = new Worker(taskWorker_script)

    const [code, setCode] = useState<string>("function pow(a, n) {\r\n     \r\n}")
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [console, setConsole] = useState<boolean>(false)

    const sendResults = () => {
        worker.postMessage(code);
        worker.onmessage = (m) => {
            setErrorMessage('')
            setMessage(m.data)
        };
        worker.onerror = (event) => {
            setMessage('')
            setErrorMessage(event.message)
        };
    }

    return (
        <div className={styles.taskPage}>
            <TaskName className={styles.name}>{currentTask?.name}</TaskName>
            <ConsoleBox console={console} setConsole={setConsole} message={message} errorMessage={errorMessage} description={currentTask?.description} classNameButtons={styles.group} classNameDesc={styles.desc}/>
            <EditorBox code={code} setCode={setCode} className={styles.code}/>
            <Buttons setConsole={setConsole} onClickSend={sendResults} className={styles.buttons}/>
        </div>
    );
});

export default Tasks;