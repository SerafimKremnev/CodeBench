import React, {DetailedHTMLProps, HTMLAttributes} from 'react';
import {Box, Button} from "@mui/material";
import BenchState from "../../../../store/BenchState";
import {AddCircleSharp, Send} from "@mui/icons-material";
import Results from "../../Results";
import cn from 'classnames'
import styles from './Sidebar.module.css'
import {observer} from "mobx-react-lite";
import NameState from "../../../../store/NameState";
interface SideBarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}
const Sidebar = observer(({className}:SideBarProps) => {
    return (
        <Box className={cn(className, styles.body)}>
            <Box className={styles.buttons}>
                <Button
                    type='button'
                    onClick={(e) => {
                        e.preventDefault();
                        BenchState.addField();
                        NameState.addName()
                    }}
                    variant='contained'
                    size='small'
                    endIcon={<AddCircleSharp fontSize='small' />}
                >
                    Добавить поле
                </Button>
                <Button
                    type='button'
                    onClick={() => {
                        for (let i = 0; i < BenchState.getFields().length; i++) {
                            let item = BenchState.getFields()[i].id;
                            const button = document.getElementById(`${item}`);
                            button?.click();
                        }
                    }}
                    variant='contained'
                    size='small'
                    endIcon={<Send fontSize='small' />}
                >
                    Запустить все тесты
                </Button>
            </Box>
            <Results className={styles.results}/>
        </Box>
    );
});

export default Sidebar;