import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import EditorWindow from "../EditorWindow";

function Boilerplate() {
  const [code, setCode] = useState("");

  return (
    <Accordion sx={{ mb: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls='panel1a-content'
        id='panel1a-header'
        sx={{ backgroundColor: "#333" }}
      >
        <Typography variant='h6' component='p'>
          Как запустить функцию? Например: foo(1,2,3)
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ backgroundColor: "#333" }}>
        <EditorWindow code={code} setCode={setCode} />
      </AccordionDetails>
    </Accordion>
  );
}

export default Boilerplate;
