import React, {DetailedHTMLProps, HTMLAttributes, useState} from 'react';
import {Alert, Box, Button, Snackbar} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import UserState from "../../../store/UserState";

interface ButtonsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    onClickSend: () => void
    setConsole: (isOpen: true) => void
    passTask: boolean,
    sendResults: (func: (value: boolean) => void) => void,
    message: string
}

const Buttons = ({className, onClickSend, setConsole, passTask, sendResults, message}: ButtonsProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const {id} = useParams()

    return (
        <Box display={'flex'} justifyContent={'right'} gap={'20px'} className={className}>
            {passTask ?
                <Button
                    onClick={() => {
                        sendResults(setOpen);
                        setConsole(true)
                        if(!UserState.token)
                            setOpen(true)
                    }}
                    variant='outlined'
                    size='small'
                >
                    Отправить
                </Button> : <></>
            }
            <Button
                onClick={() => {
                    onClickSend();
                    setConsole(true)
                }}
                variant='contained'
                size='small'
            >
                Запуск
            </Button>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="info" sx={{ width: '100%', bgcolor: '#1a4ba2'}}>
                    {
                        UserState.token ?
                        <>{message} - <Link to={`/leaderboard/${id}`} style={{borderBottom: '1px solid #fff'}}>посмотреть результаты</Link></> :
                        <>Сначала войдите в аккаунт</>
                    }

                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Buttons;