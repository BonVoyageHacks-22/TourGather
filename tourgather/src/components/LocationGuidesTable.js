import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

export default function LocationGuidesTable(props) {
    console.log(props.guides);
  return (
      <div className="location-guides-table">
    <TableContainer  component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tour Guide Name</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Profile</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.guides.map((guide) => (
            <TableRow
              key={guide.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {guide.name}
              </TableCell>
              <TableCell align="right">{guide.rating} / 5</TableCell>
              <TableCell align="right">
                <Link to={`/profile/${guide.id}`}>Profile</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
