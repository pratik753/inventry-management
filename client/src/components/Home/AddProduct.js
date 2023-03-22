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


const AddProduct = () => {
    const classes = useStyles();
  const [inventryData, setInventoryData] = useState({
    purchaseDate: "",
    price: 1,
    quantity: 1,
    productName: "",
  });

  
  const clear = () => {
    setInventoryData({
        purchaseDate: "",
        price: 1,
        quantity: 1,
        productName: "",
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    var current_date=new Date(); 
    var set_to=current_date.getFullYear()+"-"+(current_date.getMonth()+1)+"-"+current_date.getDate();
    const d=await api.createInventory({
      purchaseDate:set_to,
      price: inventryData.price,
      quantity: inventryData.quantity,
      productName: inventryData.productName,     
    })
    console.log(d)
    clear();
  };



  
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{"Creating a Product"}</Typography>

        <TextField
          name="pickUpDate"
          fullWidth
          disabled
          value={inventryData.purchaseDate}
        />
      <div className={classes.divBlock}>
          <TextField
            name="productName"
            variant="outlined"
            label="product Name"            
            value={inventryData.productName}
            onChange={(e) => setInventoryData({ ...inventryData, productName: e.target.value })}
          />
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
   
        </div>
        <div className={classes.divBlock}>
          <TextField
            name="price"
            variant="outlined"
            label="price"
            type="number"
            value={inventryData.price}
            onChange={(e) => setInventoryData({ ...inventryData, price: e.target.value })}
          />
   
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

export default AddProduct;
