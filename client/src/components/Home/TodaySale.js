import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getInventory } from "../../api";
import Axios from "axios";
import "./TodaySale.css";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const TodaySale = () => {
  const [udata, setUData] = useState([]);
  const getData = async () => {
    const data = await Axios.get("http://localhost:5000/sale/getSale");
    setUData(data.data);
    //  console.log(data.data)
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div class="table-wrapper">
    <h2 style={{textAlign:'center'}} >Today's Sale</h2>
      <table>
      
        <thead>
          <tr>
            <th>ProductName</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>purchaseDate</th>
          </tr>
        </thead>
        <tbody>
          {udata.map((row) => (
            <tr key={row._id}>
              <td> {row.productName}</td>
              <td>{row.price}</td>
              <td>{row.quantity}</td>
              <td>{row.purchaseDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodaySale;
