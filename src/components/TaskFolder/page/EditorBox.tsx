import React, {DetailedHTMLProps, HTMLAttributes} from 'react';
import styles from "../../../pages/TaskPage/TaskPage.module.css";
import Editor from "@monaco-editor/react";
import {Box} from "@mui/material";

interface EditorBoxProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    code: string,
    setCode: (code: string) => void
}

const EditorBox = ({className, code, setCode}: EditorBoxProps) => {
    return (
        <Box height='100%' className={className} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Editor
                value={code}
                onChange={value => setCode(value || '')}
                defaultLanguage='javascript'
                defaultValue='// code here'
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
    );
};

export default EditorBox;