// import styles from "./Results.module.css";

import { observer } from "mobx-react-lite";
import BenchState from "../../store/BenchState";
// import { Box, Typography } from "@mui/material";

// const Results = observer(() => {
//   return (
//     <Box>
//       <Typography variant='h6' component='p'>
//         Результаты выполнения:
//       </Typography>
//       {BenchState.getFields().map((result) => {
//         return (
//           !!result.score && (
//             <Typography key={result.name} variant='h6' component='p'>
//               name: {result.name} time: {result.score}
//             </Typography>
//           )
//         );
//       })}
//     </Box>
//   );
// });

// export default Results;

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

function createData(name: string, score: number) {
  return { name, score };
}

const rows = [
  createData("Frozen yoghurt", 159),
  createData("Ice cream sandwich", 237),
  createData("Eclair", 262),
  createData("Cupcake", 305),
  createData("Gingerbread", 356),
];

const Results = observer(() => {
  return (
    <Paper sx={{ backgroundColor: "#1c1c1c" }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#fff" }}>Имя поля</TableCell>
            <TableCell sx={{ color: "#fff" }} align='right'>
              Результат
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {BenchState.getFields().map((result) => (
            <TableRow
              key={result.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row' sx={{ color: "#fff" }}>
                {result.name}
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align='right'>
                {result.score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
});
export default Results;
