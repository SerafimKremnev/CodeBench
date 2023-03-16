import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import styles from './TaskPage.module.css';
import tasks from '../../store/TasksState';
import {observer} from "mobx-react-lite";
import Buttons from "../../components/TaskFolder/page/Buttons";
import EditorBox from "../../components/TaskFolder/page/EditorBox";
import TaskName from "../../components/TaskFolder/page/TaskName";
import ConsoleBox from "../../components/TaskFolder/page/ConsoleBox";
import myAxios from "../../myAxios";
import {ITaskFinally} from "../../components/TaskFolder/TaskList/TaskList";
import axios, {AxiosError} from "axios";
import userState, {IUser} from "../../store/UserState";

interface IMessage {
    message: string,
    score: number
    error?: string
}

interface IError {
    error: string
}
const Tasks = observer(() => {
    const {id} = useParams();
    const [currentTask, setCurrentTask] = useState<ITaskFinally>()
    const [code, setCode] = useState<string>(currentTask?.defaultFunction|| '')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [message, setMessage] = useState<IMessage>({message: '', score: 0})
    const [sendMessage, setSendMessage] = useState<string>('')
    const [consoleMessage, setConsoleMessage] = useState<boolean>(false)
    const [passTask, setPassTask] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>();
    const navigate = useNavigate()
    const getUser = async () => {
        const {data} = await myAxios.get('/auth/me', {
            headers: {
                Authorization: userState.token
            }
        })
        setUser(data)
    }
    useEffect(() => {
        getUser()
        getTask()
    }, [])

    const getTask = async () => {
        const {data} = await myAxios.get<ITaskFinally>(`/tasks/${id}`);
        setCurrentTask(data)
        setCode(data.defaultFunction)
    }
    const testResults = async () => {
        try {
            const {data} = await myAxios<IMessage>({
                method: 'post',
                data: {
                    code
                },
                url: `/tasks/check/${id}`
            })
            if(!data.error) {
                setMessage({score: data.score, message: data.message})
                setPassTask(true)
            } else{
                setMessage({score: 0, message: ''})
                setErrorMessage(data.error)
                setPassTask(false)
            }

        } catch (e: AxiosError<IError> | unknown) {
            if(axios.isAxiosError(e)) {
                if(e.response) {
                    setErrorMessage(e.response.data.error)
                }
            }
        }
    }
    const sendResults = async (setOpen: (value: boolean) => void) => {
        const {data} = await myAxios<IMessage>({
            method:'post',
            url: `/tasks/${id}`,
            headers: {
                Authorization: userState.token
            },
            data: {
                userId: user?._id,
                timeDecision: message.score,
                decision: code
            }
        })
        console.log(data)
        setSendMessage(data?.message)
        if(data.message) {
            setOpen(true)
        } else {
            navigate(`/leaderboard/${id}`)
        }

    }
    return (
        <div className={styles.taskPage}>
            <TaskName className={styles.name}>{currentTask?.name}</TaskName>
            <ConsoleBox console={consoleMessage} setConsole={setConsoleMessage} message={message} errorMessage={errorMessage} description={currentTask?.description} classNameButtons={styles.group} classNameDesc={styles.desc}/>
            <EditorBox code={code} setCode={setCode} className={styles.code}/>
            <Buttons message={sendMessage} sendResults={sendResults} passTask={passTask} setConsole={setConsoleMessage} onClickSend={testResults} className={styles.buttons}/>
        </div>
    );
});

export default Tasks;