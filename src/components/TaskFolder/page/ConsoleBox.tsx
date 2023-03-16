import React, {DetailedHTMLProps, HTMLAttributes, useState} from 'react';
import {Box, Button, ButtonGroup, Typography} from "@mui/material";
interface ConsoleBoxProps {
    description: string | undefined,
    classNameButtons: string,
    classNameDesc: string,
    message: { message: string, score: number },
    errorMessage: string
    console: boolean,
    setConsole: (isOpen: boolean) => void
}

const ConsoleBox = ({description, classNameButtons, classNameDesc, message, errorMessage, console, setConsole}: ConsoleBoxProps) => {
    return (
        <>
            <ButtonGroup size={'small'} className={classNameButtons} variant="outlined" aria-label="outlined button group">
                <Button onClick={() => setConsole(false)}>Описание</Button>
                <Button onClick={() => setConsole(true)}>Консоль</Button>
            </ButtonGroup>
            <Box display={!console ? 'block' : 'none'} overflow={"auto"} padding={'10px 20px'} borderRadius={2} className={classNameDesc} sx={{background: '#333'}}>
                <Typography
                    variant='subtitle1'
                    component='p'
                    color='gray'
                    sx={{ mr: 1 }}
                >
                    {description}
                </Typography>
            </Box>
            <Box display={console ? 'block' : 'none'} overflow={"auto"} padding={'10px 20px'} borderRadius={2} className={classNameDesc} sx={{background: '#333'}}>
                <Typography
                    variant='subtitle1'
                    component='p'
                    color='gray'
                    sx={{ mr: 1 }}
                >
                    {message.message ?
                        <>
                            <Typography
                                variant='subtitle1'
                                component='p'
                                color='green'
                                sx={{ mr: 1 }}>
                                    {message.message}
                            </Typography>
                            <Typography
                                variant='subtitle1'
                                component='p'
                                color='green'
                                fontSize={'15px'}
                                sx={{ mr: 1 }}>
                                    Очки цикла: {message.score}
                            </Typography>
                        </> :
                        <Typography
                            variant='subtitle1'
                            component='p'
                            color='error'
                            sx={{ mr: 1 }}
                        >{errorMessage}</Typography>}
                </Typography>
            </Box>
        </>
    );
};

export default ConsoleBox;