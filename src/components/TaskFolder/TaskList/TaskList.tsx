import React, {useEffect, useState} from 'react';
import Task from "../Task/Task";
import styles from './TaskList.module.css'
import TasksState from '../../../store/TasksState'
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import UserState, {IUser} from "../../../store/UserState";
import myAxios from "../../../myAxios";
import EditorWindow from "../../EditorWindow";
import {Controller, useForm} from "react-hook-form";
import ArgumentBlock, {IArgs} from "../ArgumentBlock";
import {observer} from "mobx-react-lite";


const TaskList = observer((): JSX.Element => {
    const {register, control, handleSubmit} = useForm<ITask>();
    const [user, setUser] = useState<IUser>();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getUser = async () => {
        const {data} = await myAxios.get('/auth/me', {
            headers: {
                Authorization: UserState.token
            }
        })
        setUser(data)
    }


    const getTasks = async () => {
        const {data} = await myAxios.get('/tasks')
        TasksState.getTasks(data)
    }

    useEffect(() => {
        getUser()
        getTasks()
    }, [])

    const createTask = async(formData: ITaskFinally) => {
        try {
            const {data} = await myAxios({
                method: 'post',
                url: '/tasks',
                headers: {
                    Authorization: UserState.token
                },
                data: formData
            })
            getTasks()
            setOpen(false)
        } catch (e){
            console.log(e)
        }
    }
    const onSubmit = (data: ITask) => {
        createTask({...data,
                tests: data.tests.map(e => ({args: e.args.split(',').map(e => JSON.parse(e)), expected: JSON.parse(e.expected)})),
                speedTest: data.speedTest.split(',').map(e => JSON.parse(e))
            }
        )
    }


    return (
        <>
            <div className={styles.taskList}>
                {user?.isAdmin &&
                    <>
                      <Button onClick={handleOpen}>Добавить задачу</Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                      >
                          <form onSubmit={handleSubmit(onSubmit)} style={{padding: '20px', maxWidth: '500px', margin: "50px auto 0", display: 'grid', gridTemplateColumns: '1fr', gap: '10px',background: '#3d3d3d'}}>
                            <Typography fontSize={'22px'} textAlign={'center'} color={'white'}>Добавить задачу</Typography>
                            <TextField {...register('name')} size={'small'} type={'text'} sx={{input: {color:'#fff'}}} focused label={'Название задачи'} variant={'outlined'}/>
                            <TextField {...register('description')} size={'small'} type={'text'} sx={{input: {color:'#fff'}}} focused label={'Описание задачи'} variant={'outlined'}/>
                            <Typography fontSize={'12px'} color={'white'}>Как выглядит функция:</Typography>
                            <Controller control={control} render={({ field}) => (<EditorWindow height={'150px'} code={field.value} setCode={field.onChange}/>)} name={'defaultFunction'}/>
                            <Controller control={control} render={({ field}) => <ArgumentBlock tests={field.value} setTests={field.onChange}/>} name={'tests'}/>
                            <TextField {...register('speedTest')} size={'small'} type={'text'} sx={{input: {color:'#fff'}}} focused label={'Аргументы для проверки скорости'} variant={'outlined'}/>
                            <Button onSubmit={handleSubmit(onSubmit)} type={'submit'} variant={'contained'}>Добавить задачу</Button>
                          </form>
                      </Modal>
                    </>}
                {TasksState.tasks.map(e => <Task id={e._id} name={e.name}>{e.description}</Task>)}
            </div>
        </>
    )

});
interface IArgsFinally {
    args: any[]
    expected: any
}

export interface ITaskFinally {
    name: string,
    description: string
    tests: IArgsFinally[],
    speedTest: any[],
    defaultFunction: string
}

export interface ITaskMain {
    _id: string,
    name: string,
    description: string
    tests: IArgsFinally[],
    speedTest: any[],
    defaultFunction: string
}

export interface ITaskUsers {
    user: IUser,
    timeDecision: number,
    decision: string
}
interface ITask {
    name: string,
    description: string
    tests: IArgs[],
    speedTest: string,
    defaultFunction: string
}
export default TaskList;