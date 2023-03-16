import React, {useEffect, useState} from 'react';
import styles from './Header.module.css'
import {Avatar, Box, Button, Icon, IconButton, Modal, Typography} from "@mui/material";
import {Link, NavLink, useNavigate} from "react-router-dom";
import UserState, {IUser} from "../../../store/UserState";
import {observer} from "mobx-react-lite";
import myAxios from "../../../myAxios";
import {Logout} from "@mui/icons-material";
const Header = observer(() => {

    const [user, setUser] = useState<IUser>();
    const [open, setOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const getUser = async () => {
        const {data} = await myAxios.get('/auth/me', {
            headers: {
                Authorization: UserState.token
            }
        })
        setUser(data)
    }
    const logoutHeader = () => {
        UserState.logout();
        setOpen(false)
        navigate('/auth')
    }
    useEffect(() => {
        getUser()
    }, [])
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#333333',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 2
    };
    return (
        <Box gap={'20px'} alignItems={'center'} justifyContent={"space-between"} display={"flex"}>
            <Link to={'/'}>
            <Box className={styles.logo}>
                <Typography fontWeight={300} fontSize={'25px'} color={'white'}>
                    Code
                </Typography>
                <Typography fontWeight={600} fontSize={'25px'} color={'primary'}>
                    Bench
                </Typography>
            </Box>
            </Link>
            <NavLink className={styles.link} to={'/'}>Тест</NavLink>
            <NavLink className={styles.link} to={'/tasks'}>Задачи</NavLink>
            {
                UserState.token ?
                <Box display={'flex'} gap={2}>
                    <Link to={'/profile/me'}><Avatar>{user && user.login[0].toUpperCase()}</Avatar></Link>
                    <IconButton onClick={()=> setOpen(true)}>
                        <Logout/>
                    </IconButton>
                    <Modal open={open} onClose={()=>setOpen(false)}>
                        <Box sx={style}>
                            <Typography fontSize={'18px'} marginBottom={'20px'}>
                                Вы действительно хотите выйти?
                            </Typography>
                            <Box display={'flex'} gap={2} justifyContent={'right'}>
                                <Button variant={"contained"} onClick={()=>setOpen(false)} color={'primary'}>Нет</Button>
                                <Button variant={"contained"} onClick={logoutHeader} color={'error'}>Да</Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>:
                <Box className={styles.buttons}>
                    <Link to={'/auth'}>
                        <Button variant={'contained'} size={'small'}>
                            Войти
                        </Button>
                    </Link>
                    <Link to={'/register'}>
                        <Button variant={'outlined'} size={'small'}>
                            Регистрация
                        </Button>
                    </Link>
                </Box>
            }
        </Box>
    );
});

export default Header;