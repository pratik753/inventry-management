import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import inventryRoutes from "./routes/inventry.js";
import userRoutes from "./routes/user.js";
import saleRoutes from "./routes/sale.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
//  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
app.use("/inventry", inventryRoutes);
app.use("/user", userRoutes);
app.use("/sale", saleRoutes);

const CONNECTION_URL =
  "mongodb+srv://aman:aman1234@cluster0.kywvikl.mongodb.net/inventry";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
