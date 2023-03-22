import express from "express";
import mongoose from "mongoose";

import Sale from "../models/sale.js";
import User from "../models/user.js";

const router = express.Router();



export const getSale = async (req, res) => {
 
  try {
    const sale = await Sale.find();
    // console.log(laundry, "Laundry");
    res.status(200).json(sale);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSale = async (req, res) => {
  const sale = req.body;
  // console.log(laundry);
  const newSale = new Sale({
    ...sale,
    createdAt: new Date().toISOString(),
  });

  try {
    await newSale.save();
    res.status(201).json(newSale);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getInventryName = async (req, res) => {
  const laundry = req.body;
  // console.log(laundry);

  try {
    const inventry = await Inventry.find();
    res.status(200).json(inventry);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};



export default router;
