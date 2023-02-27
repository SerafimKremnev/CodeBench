import React, {useState} from 'react';
import styles from './TaskPage.module.css'
import TaskList from "../../components/TaskList/TaskList";
import {useParams} from "react-router-dom";
import Editor from "@monaco-editor/react";
import {Box} from "@mui/material";

const Tasks = () => {
    const {id} = useParams();
    const [code, setCode] = useState<string>("")
    return (
        <div className={styles.taskPage}>
            <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
                <Editor
                    height='400px'
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
        </div>
    );
};

export default Tasks;