import React, {useState} from 'react';
import {Avatar, Box, Button, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import myAxios from "../../../myAxios";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import UserState from "../../../store/UserState";
import axios, {AxiosError} from "axios";

interface AuthProps {
    type: 'reg' | 'log',
}

interface User {
    login: string,
    password: string,
    passwordCheck: string
}

interface ErrorMessage {
    message: string
}
const Auth = observer(({type}: AuthProps) => {
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState<string>('');
    const navigate = useNavigate()
    const check = () => {
        return type === 'reg'
    }

    const onRegister = async(formData: User) => {
        try {
            //ЕСЛИ РЕГИСТРАЦИЯ
            if(check()) {
                const {data} = await myAxios.post('/auth/register', {
                    login: formData.login,
                    password: formData.password,
                })
                localStorage.setItem('token', JSON.stringify(data.token))
                UserState.getToken(data.token)
                navigate('/profile/me')
                return data
            }
            //ЕСЛИ АВТОРИЗАЦИЯ
            const {data} = await myAxios.post('/auth/login', {
                login: formData.login,
                password: formData.password,
            })
            localStorage.setItem('token', JSON.stringify(data.token))
            UserState.getToken(data.token)
            navigate('/profile/me')
            return data
        } catch (e: unknown) {
            if(axios.isAxiosError(e)) {
                if(e.response) {
                    console.log(e)
                    if(e.response.data.message) {
                        setError(e.response.data.message)
                    } else {
                        setError(e.response.data[0].msg)
                    }
                }
            }
        }
    }
    const onSubmit = (data: any) => {
        if(!check()) {
            onRegister(data)
        }
        if(data.password == data.passwordCheck) {
            onRegister(data);
        } else {
            if(check()) {
                setError('Пароли не совпадают')
            }
        }
    }

    if(check()) {
        return (
            <form style={{padding: '20px', maxWidth: '500px', margin: '50px auto 0', display: 'grid', gridTemplateColumns: '1fr', gap: '10px',background: '#3d3d3d'}} onSubmit={handleSubmit(onSubmit)}>
                <Typography textAlign={'center'} component={'p'} fontWeight={700} fontSize={18}>Регистрация</Typography>
                <TextField min required {...register('login')} fullWidth size={'small'} type={'text'} sx={{input: {color:'#fff'}}} focused label={'Логин'} variant={'outlined'}/>
                <TextField required {...register('password')} fullWidth size={'small'} sx={{input: {color:'#fff'}}} focused label={'Пароль'} type={'password'} variant={'outlined'}/>
                <TextField required {...register('passwordCheck')} fullWidth size={'small'} sx={{input: {color:'#fff'}}} focused label={'Подтвердите пароль'} type={'password'} variant={'outlined'}/>
                {error && <Typography fontSize={12} color={'error'}>{error}</Typography>}
                <Button onSubmit={handleSubmit(onSubmit)} type={'submit'} fullWidth size={'large'} variant={"contained"} color={'primary'}>Зарегестрироваться</Button>
            </form>
        )
    }
    return (
        <form style={{padding: '20px', maxWidth: '500px', margin: '50px auto 0', display: 'grid', gridTemplateColumns: '1fr', gap: '20px',background: '#3d3d3d'}} onSubmit={handleSubmit(onSubmit)}>
            <Typography textAlign={'center'} component={'p'} fontWeight={700} fontSize={18}>Войти в аккаунт</Typography>
            <TextField {...register('login')} fullWidth size={'small'} type={'text'} sx={{input: {color:'#fff'}}} focused label={'Логин'} variant={'outlined'}/>
            <TextField {...register('password')}fullWidth size={'small'} sx={{input: {color:'#fff'}}} focused label={'Пароль'} type={'password'} variant={'outlined'}/>
            {error && <Typography fontSize={12} color={'error'}>{error}</Typography>}
            <Button onSubmit={handleSubmit(onSubmit)} type={'submit'} fullWidth size={'large'} variant={"contained"} color={'primary'}>Войти</Button>
        </form>
    );
});

export default Auth;