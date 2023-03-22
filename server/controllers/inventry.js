import express from "express";
import mongoose from "mongoose";

import Inventry from "../models/inventry.js";
import User from "../models/user.js";

const router = express.Router();



export const getLaundry = async (req, res) => {
  const id = req.userId;
  const userId = id;
  // console.log(req.userId);

  try {
    const laundry = await Laundry.find({ userId });
    // console.log(laundry, "Laundry");
    res.status(200).json(laundry);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getAllLaundry = async (req, res) => {
  try {
    const laundry = await Laundry.find();
    // console.log(laundry, "Laundry");
    res.status(200).json(laundry);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createInventory = async (req, res) => {
  const inventory = req.body;
  // console.log(laundry);
  const newInventory = new Inventry({
    ...inventory,
    createdAt: new Date().toISOString(),
  });

  try {
    await newInventory.save();
    // console.log(laundry, "succes");
    res.status(201).json(newInventory);
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

export const postInventry = async (req, res) => {

  const inventry = req.body;
  // console.log(laundry);
  const newInventry = new Inventry({
    ...inventry,
    createdAt: new Date().toISOString(),
  });
  try {
    await newInventry.save();
    // console.log(laundry, "succes");
    res.status(201).json(newInventry);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const inventryQuantity = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log(id,data)
 try{
  const updateData = await Inventry.findByIdAndUpdate(
    id,
    {
      quantity: data.quantity,
    },
    { new: true }
  );   
   res.status(201).json(updateData);
  } catch (error) {
    console.log(error)
    res.status(409).json({ message: error.message });
  }
};

export const changeStatus = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  // console.log(data.status, "fdata");
  console.log(data);
  let strSend = "";
  if (data.status == 0) strSend = "New Request";
  if (data.status == 1) strSend = "InProgress";
  if (data.status == 2) strSend = "Accpeted!";
  if (data.status == 3) strSend = "Finish";

  const updateData = await Laundry.findByIdAndUpdate(
    id,
    {
      statusLaundry: data.status,
    },
    { new: true }
  );
  const userData = await User.findById({ _id: updateData.userId });
  console.log(updateData);
  console.log(userData);
  const dataMail = {
    from: "pranay2017raj@gmail.com",
    to: `${userData.email}`,
    subject: "Laundry Status",
    text: `
    Hii ${userData.name}, \n
    your Request Status: ${strSend} \n
    Total Price ${updateData.totalPrice} \n 
    Pick Up Date : ${updateData.pickUpDate}`,
  };
  mg.messages().send(dataMail, function (error, body) {
    if (error) console.log(error);
    else console.log("successful");
  });
  res.json(updateData);
};

export default router;
