import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import styles from './App.module.css'
import Sidebar from "./Lay/Sidebar";
import Body from "./Lay/Body";

const App = observer(() => {
  return (
    <Box mt={2} className={styles.wrapper}>
        <Sidebar className={styles.sidebar}/>
        <Body className={styles.body}/>
    </Box>
  );
});

export default App;
