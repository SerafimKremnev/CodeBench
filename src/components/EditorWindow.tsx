import { Box } from "@mui/material";
import Editor, {EditorProps} from "@monaco-editor/react";
import { observer } from "mobx-react-lite";

interface ICodeBlock extends EditorProps{
  code: string;
  setCode: (value: string) => void;
}

const EditorWindow = observer(({ code, setCode, ...props}: ICodeBlock) => {
  return (
    <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
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
        {...props}
      />
    </Box>
  );
});

export default EditorWindow;
