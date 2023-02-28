import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import Editor from "@monaco-editor/react";
import {Box, Button, ButtonGroup, Typography} from "@mui/material";
import styles from './TaskPage.module.css'
import SendIcon from "@mui/icons-material/Send";

const Tasks = () => {
    const {id} = useParams();
    const [code, setCode] = useState<string>("")
    return (
        <div className={styles.taskPage}>
            <Typography
                className={styles.name}
                variant='subtitle1'
                component='h3'
                color='white'
                fontSize={18}
                sx={{ mr: 2 }}
            >
                Функция возведения в степень
            </Typography>
            <ButtonGroup size={'small'} className={styles.group} variant="outlined" aria-label="outlined button group">
                <Button>Описание</Button>
                <Button>Консоль</Button>
            </ButtonGroup>
            <Box overflow={"auto"} padding={'10px 20px'} borderRadius={2} className={styles.desc} sx={{background: '#333'}}>
                <Typography
                    className={styles.name}
                    variant='subtitle1'
                    component='p'
                    color='gray'
                    sx={{ mr: 1 }}
                >
                    Напишите функцию которая возвращает первый аргумент в степени второго аргумента
                </Typography>
            </Box>
            <Box className={styles.code} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <Editor
                    height='100%'
                    defaultLanguage='javascript'
                    defaultValue='// code here'
                    value={code}
                    options={{
                        tabSize: 5,
                        fontSize: 15,
                        minimap: {
                            enabled: false,
                        },
                    }}
                    onChange={(value) => {
                        setCode(value || "");
                    }}
                    theme='vs-dark'
                />
            </Box>
            <Box className={styles.test} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <Editor
                    height='100%'
                    defaultLanguage='javascript'
                    value={'// test'}
                    options={{
                        tabSize: 5,
                        fontSize: 15,
                        minimap: {
                            enabled: false,
                        },
                    }}
                    theme='vs-dark'
                />
            </Box>
            <div className={styles.buttons}>
                <Button
                    variant='outlined'
                    size='small'
                >
                    Проверить
                </Button>
                <Button
                    variant='contained'
                    size='small'
                >
                    Запуск
                </Button>
            </div>
        </div>
    );
};

export default Tasks;