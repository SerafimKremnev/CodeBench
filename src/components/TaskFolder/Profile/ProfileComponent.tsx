import React, {useEffect, useState} from 'react';
import {Avatar, Button, Typography} from "@mui/material";
import styles from './ProfileComponent.module.css'
import userState, {IUser} from "../../../store/UserState";
import {observer} from "mobx-react-lite";
import myAxios from "../../../myAxios";
import UserState from "../../../store/UserState";
import {useNavigate} from "react-router-dom";
import CompletedTask from "../CompletedTask/CompletedTask";


const ProfileComponent = observer(() => {
    const [user, setUser] = useState<IUser>();
    const navigate = useNavigate()
    const getUser = async () => {
        const {data} = await myAxios.get('/auth/me', {
            headers: {
                Authorization: userState.token
            }
        })
        setUser(data)
        console.log(data)
    }
    useEffect(() => {
        getUser()
    }, [])

    function logoutProfile() {
        UserState.logout()
        navigate('/auth')
    }
    return (
        userState.token && user ?
        <div className={styles.wrapper}>
            <Avatar sx={{width: '100px', height: '100px', fontSize: '32px',background: 'primary'}}>{user && user.login[0].toUpperCase()}</Avatar>
            <Typography fontSize={'32px'}>{user && user.login}</Typography>
            <Button onClick={logoutProfile} color={'error'} variant={'contained'}>Выйти из акканута</Button>
            <Typography fontSize={'25px'}>Выполненные задачи</Typography>
            {user.completedTasks.length > 0 ? user.completedTasks.map(task => (
                <CompletedTask task={task}/>
            )) :  <Typography color={'#444'} fontSize={'22px'}>Выполненных задач пока нет</Typography> }
        </div> : <></>
    )
});

export default ProfileComponent;