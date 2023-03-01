import React, {DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';
import {Typography} from "@mui/material";

interface TaskNameProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode
}
const TaskName = ({children, className}: TaskNameProps) => {
    return (
        <Typography
            className={className}
            variant='subtitle1'
            component='h3'
            color='white'
            fontSize={18}
            sx={{ mr: 2 }}
        >
            {children}
        </Typography>
    );
};

export default TaskName;