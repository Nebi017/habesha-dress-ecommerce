import express from "express";
import cors from "cors";
import "dotenv/config";
import ConnectDB from "./config/mongodb.js";
import connectCloadinary from "./config/cloudinary.js";
import userRoute from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cartRouter from "./routes/cartRoute.js";

//App Config
const app = express();
const PORT = process.env.PORT || 4000;

ConnectDB();
connectCloadinary();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// api endpoints
app.use("/api/user", userRoute);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("Api is Working!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
