import { useState } from "react";
import styles from "./Boilerplate.module.css";
import { Box, Typography, Button } from "@mui/material";
import Editor from "@monaco-editor/react";

function Boilerplate() {
  const [code, setCode] = useState("");

  return (
    <Box>
      <Typography variant='h6' component='p'>
        Как запустить функцию? Например: foo(1,2,3)
      </Typography>

      <Box sx={{ borderRadius: 2, overflow: "hidden", mb: 2 }}>
        <Editor
          height='300px'
          defaultLanguage='javascript'
          defaultValue='// code here'
          value={code}
          options={{
            tabSize: 2,
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
    </Box>
  );
}

export default Boilerplate;
