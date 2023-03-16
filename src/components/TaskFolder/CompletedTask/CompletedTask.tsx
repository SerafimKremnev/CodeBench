import styles from "./CompletedTask.module.css";
import {Box, Button, Typography} from "@mui/material";
import React from "react";
import {ITaskData} from "../../../store/UserState";
import {CopyBlock, dracula} from "react-code-blocks";
import {Link} from "react-router-dom";

interface CompletedTaskProps {
    task: ITaskData
}
const CompletedTask = ({task}:CompletedTaskProps) => {
    console.log(task.task._id)
    return (
        <div className={styles.wrapper}>
            <Link to={`/tasks/${task.task._id}`} className={styles.name}>
                <Typography fontSize={18}>{task.task.name}</Typography>
            </Link>
            <Box className={styles.decision}>
                <CopyBlock
                    language={'JavaScript'}
                    text={task.decision}
                    showLineNumbers={true}
                    wrapLines={true}
                    theme={dracula}
                    codeBlock
                />
            </Box>
            <Link to={`/leaderboard/${task.task._id}`}>
            <Button variant={"outlined"} className={styles.button}>
                Посмотреть результаты
            </Button>
            </Link>
        </div>
    );
};

export default CompletedTask;