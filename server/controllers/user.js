import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Token from "../models/token.js";
import User from "../models/user.js";
import mailgun from "mailgun-js";
import crypto from "crypto";

const DOMAIN = "sandboxaa9d473a429b4afb9156164e8e15c987.mailgun.org";
const api_key = "94d2611219cd1fc82d6b551e939477a5-bdb2c8b4-3e509a5d";
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

export const signin = async (req, res) => {
  //
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid Credential" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      result: existingUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "SomeThing went wrong." });
  }
};
export const signup = async (req, res) => {
  //
  const { email, password, confirmPassword, phoneNo, firstName, lastName } =
    req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "User password not match." });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      phoneNo,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "SomeThing went wrong." });
  }
};

export const changePassword = async (req, res) => {
  const id = req.userId;
  const userId = id;
  try {
    const user = await User.findById(userId).select("+password");
    console.log(user.password);

    const isPasswordCorrect = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid Credential" });

    // 3) If so, Update Password

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
    const result = await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
    // console.log(id, req.body, "changePassword");

    res.status(201).json(result);
  } catch (error) {
    console.log(error);

    res.status(409).json({ message: error });
  }
};
export const recoverPasswordEmail = async (req, res) => {
  try {
    // const { email } = req.body;
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(409)
        .send({ message: "User with given email does not exist!" });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const url = `http://localhost:3000/recoverPassword/${user._id}/${token.token}/`;
    console.log(url);
    // await sendEmail(user.email, "Password Reset", url);

    // const dataMail = {
    //   from: "kumaraman@gmail.com",
    //   to: `${user.email}`,
    //   subject: "Recover Password",
    //   text: ` ${user.email}, "Password Reset", ${url}`,
    // };
    // mg.messages().send(dataMail, function (error, body) {
    //   if (error) console.log(error);
    //   else console.log("successful");
    // });

    res.status(200).send({
      data: url,
      message: "Password reset link sent to your email account",
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Internal Server Error" });
  }
};

export const setPassword = async (req, res) => {
  console.log(req.params.id, req.params.token);
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    if (!user.verified) user.verified = true;

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
    const result = await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
    console.log(result, "result");
    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
