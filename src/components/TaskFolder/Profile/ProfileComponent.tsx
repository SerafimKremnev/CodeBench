import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, Skeleton, Typography} from "@mui/material";
import styles from './ProfileComponent.module.css'
import userState, {IUser} from "../../../store/UserState";
import {observer} from "mobx-react-lite";
import myAxios from "../../../myAxios";
import UserState from "../../../store/UserState";
import {useNavigate} from "react-router-dom";
import CompletedTask from "../CompletedTask/CompletedTask";


const ProfileComponent = observer(() => {
    const [user, setUser] = useState<IUser>();
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const getUser = async () => {

        setLoading(true)
        const {data} = await myAxios.get('/auth/me', {
            headers: {
                Authorization: userState.token
            }
        })
        setUser(data)
        setLoading(false)
    }
    useEffect(() => {
        getUser()
    }, [])

    function logoutProfile() {
        UserState.logout()
        navigate('/auth')
    }
    return (
        loading ?
            <Box m={3} display={'grid'} justifyItems={'center'} gap={'15px'}>
                <Skeleton variant="circular" width={100} height={100} />
                <Skeleton width={150} variant="text" sx={{ fontSize: '50px' }} />
                <Skeleton width={184} height={36} variant={'rectangular'} sx={{ fontSize: '50px' }} />
            </Box> :
            (userState.token && user ?
                <div className={styles.wrapper}>
                    <Avatar sx={{width: '100px', height: '100px', fontSize: '32px',background: 'primary'}}>{user && user.login[0].toUpperCase()}</Avatar>
                    <Typography fontSize={'32px'}>{user && user.login}</Typography>
                    <Button onClick={logoutProfile} color={'error'} variant={'contained'}>Выйти из акканута</Button>
                    <Typography fontSize={'25px'}>Выполненные задачи</Typography>
                    {user.completedTasks.length > 0 ? user.completedTasks.map(task => (
                        <CompletedTask task={task}/>
                    )) :  <Typography color={'#444'} fontSize={'22px'}>Выполненных задач пока нет</Typography> }
                </div>
            : <></>)
    )
});

export default ProfileComponent;