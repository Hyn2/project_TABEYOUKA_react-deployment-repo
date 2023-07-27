


import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, Typography, useMediaQuery, useTheme } from "@mui/material";


export default function InformationTable({ storeData, title } : { storeData : any, title : string }) {
    const theme = useTheme();
    const isDownMD = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box sx={{ width : "100%", height : "auto" }}>
          <Box sx={{ width : "96%", height : "5%", p : 2 }}>
            <Typography variant="h4">{title}</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: isDownMD ? 300 : 650 }} aria-label="simple table">
              <TableBody>
                {Object.keys(storeData).map((key, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }}}
                >
                  <TableCell component="th" scope="row" sx={{ bgcolor : "#EDEDED", width : isDownMD ? "20px" : "140px" , minWidth : isDownMD ? "70px" : "140px" }}>
                  {key}
                  </TableCell>
                  <TableCell align="right" sx={{ textAlign : "left" }}>{storeData[key]}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
    )
}