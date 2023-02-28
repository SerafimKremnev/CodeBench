import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import Editor from "@monaco-editor/react";
import {Box, Button, ButtonGroup, Typography} from "@mui/material";
import styles from './TaskPage.module.css';
import tasks from '../../store/TasksState';
import {observer} from "mobx-react-lite";


const Tasks = observer(() => {
    const {id} = useParams();
    const currentTask = tasks.tasks.find(e => e.id == id)
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
                {currentTask?.name}
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
                    {currentTask?.description}
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
});

export default Tasks;