import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import useStyles from "./styles";
import { createInventory, getInventory } from "../../actions/inventory";
import * as api from "../../api/index";

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
const Form = ({ currentId, setCurrentId }) => {
  const [productName, setProductName] = useState([]);
  const [inventoryAll, setInventoryAll] = useState([])

  const [inventryData, setInventoryData] = useState({
    id: "",
    date: new Date(),
    productName: "",
    price: 0,
    quantity: 1,
    Avi_quantity: 0,
  });

  const getData=async()=>{
    const { data } = await api.getAllInventory();
    const names = data.map(data => data?.productName);

    setProductName(names);
    setInventoryAll(data);
  }

  useEffect(async () => {
    getData()
  }, [])


  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));



  const clear = () => {
    setInventoryData({
      id: "",
      date: new Date(),
      productName: "",
      price: 0,
      quantity: 1,
      Avi_quantity: 0,
    });
    getData()
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inventryData.Avi_quantity - inventryData.quantity < 0) {
      alert("Quantity is More");
      return;
    }
    const d = await api.createSale({
      purchaseDate: inventryData.date,
      price: inventryData.price,
      quantity: inventryData.quantity,
      productName: inventryData.productName,
    })
    const dd = await api.inventryQuantity({
      quantity: inventryData.Avi_quantity - inventryData.quantity
    }, inventryData.id)
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to Inventory.
        </Typography>
      </Paper>
    );
  }

  // const theme = useTheme();


  const handleChange = (event) => {
    const { target: { value }, } = event;
    const inventory = inventoryAll.find(inventoryAll => inventoryAll.productName === value);
    console.log(inventory)
    var current_date = new Date();
    var set_to = current_date.getFullYear() + "-" + (current_date.getMonth() + 1) + "-" + current_date.getDate();
    setInventoryData({
      ...inventory,
      id: inventory._id,
      date: set_to,
      productName: inventory.productName,
      price: inventory.price,
      Avi_quantity: inventory.quantity,
      quantity: 1,
    })
    // setInventoryData({
    //   ...inventryData,
    //   productName: value
    // })
    // setProductName(
    //   // On autofill we get a stringified value.
    //   typeof value === 'string' ? value.split(',') : value,
    // );
    console.log(inventryData)
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{"Creating a Invoice"}</Typography>

        <TextField
          name="pickUpDate"
          // type="date"
          fullWidth
          disabled
          value={inventryData.date}

        />
        {/* <input /> */}
        <div className={classes.divBlock}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Name</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"

              value={inventryData.productName}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
            >
              {productName.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                // style={getStyles(name, productName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </div>
        <div className={classes.divBlock}>

          <Typography variant="h6">Available :{inventryData.Avi_quantity}</Typography>
        </div>
        <div className={classes.divBlock}>
          <TextField
            name="quantity"
            variant="outlined"
            label="quantity"
            type="number"
            value={inventryData.quantity}
            onChange={(e) => setInventoryData({ ...inventryData, quantity: e.target.value })}
          />
          <Typography variant="h6">{inventryData?.price}</Typography>
        </div>



        <div className={classes.divBlock}>
          <Typography variant="h6">{"Total Price : Rs "}</Typography>

          <Typography variant="h6">{inventryData.quantity * inventryData?.price}</Typography>
        </div>


        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
