import {ITaskUsers} from "../TaskList/TaskList";
import React, {useState} from "react";
import {CopyBlock, dracula} from "react-code-blocks";
import styles from './UserBlock.module.css'
import {Avatar, Box, Typography} from "@mui/material";

interface UserBlockProps {
    user: ITaskUsers,
    rating: number
}

const UserBlock = ({user, rating}: UserBlockProps) => {

    function getColor(num: number) {
        switch (num) {
            case 1:
                return '#b29347'
                break
            case 2:
                return '#7c7c7c'
                break
            case 3:
                return '#655a51'
                break
            default:
                return '#1976d2'
        }
    }
    return (
        <div className={styles.wrapper}>
            <Typography sx={{color: getColor(rating)}} fontSize={25} marginRight={'20px'} className={styles.rating}>{rating}</Typography>
            <Box display={'flex'} alignItems={'center'} gap={2} className={styles.login}>
                <Avatar>{user.user.login[0].toUpperCase()}</Avatar>
                <Typography fontSize={20} >{user.user.login}</Typography>
            </Box>
            <Typography fontSize={18} className={styles.score}>{user.timeDecision} раз выполнился скрипт за одну секунду</Typography>
            <Box className={styles.decision}>
                <CopyBlock
                    language={'JavaScript'}
                    text={user.decision}
                    showLineNumbers={true}
                    wrapLines={true}
                    theme={dracula}
                    codeBlock
                />
            </Box>
        </div>
    );
};

export default UserBlock;