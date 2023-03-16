import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import myAxios from "../../myAxios";
import {ITaskFinally, ITaskUsers} from "./TaskList/TaskList";
import UserBlock from "./UserBlock/UserBlock";
import userState, {IUser} from "../../store/UserState";


interface ITask {
    _id: string
    name: string,
    description: string
    speedTest: any[],
    defaultFunction: string
    users: ITaskUsers[]
}


const LeaderboardComponent = () => {
    const {id} = useParams()
    const [currentTask, setCurrentTask] = useState<ITaskUsers[]>()
    const [userDB, setUserDB] = useState<IUser>();
    const [task, setTask] = useState<ITask>();
    const getTask = async () => {
        const {data} = await myAxios.get<ITask>(`/tasks/${id}`);
        setCurrentTask(data.users.sort((a, b)=> b.timeDecision - a.timeDecision))
        setTask(data)
    }
    useEffect(() => {
        getTask()
        getUser()
    }, [])
    const getUser = async () => {
        const {data} = await myAxios.get('/auth/me', {
            headers: {
                Authorization: userState.token
            }
        })
        setUserDB(data)
    }

    return (
        <>
            {userDB?.completedTasks?.find(t => t.task._id == id) ?
                <>
                    <Typography fontSize={22} fontWeight={700}>{task?.name}</Typography>
                    <Typography color={'primary'} fontSize={18}>Вы на {currentTask?.length ? currentTask?.findIndex((user) => user.user._id == userDB?._id)+1 : 0} месте</Typography>
                    <Box display={'grid'} mt={2} gridTemplateColumns={'1fr'} gap={2}>
                        {currentTask?.map((user, index) => <UserBlock key={user.user._id} user={user} rating={index+1}/>)}
                    </Box>
                </> :
                <Typography mt={5} textAlign={'center'} fontSize={22} fontWeight={700}>Сначала пройдите задачу</Typography>
            }

        </>
    );
};

export default LeaderboardComponent;