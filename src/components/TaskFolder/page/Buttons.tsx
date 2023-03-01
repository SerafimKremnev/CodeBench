import React, {DetailedHTMLProps, HTMLAttributes} from 'react';
import {Box, Button} from "@mui/material";

interface ButtonsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    onClickSend: () => void
    setConsole: (isOpen: true) => void
}

const Buttons = ({className, onClickSend, setConsole}: ButtonsProps) => {
    return (
        <Box display={'flex'} justifyContent={'right'} gap={'20px'} className={className}>
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
        </Box>
    );
};

export default Buttons;