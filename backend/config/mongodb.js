import mongoose from "mongoose";

const ConnectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
  });
   mongoose.connection.on("error", (err) => {
     console.error(`MongoDB connection error: ${err}`);
   });
  await mongoose.connect(`${process.env.MONGODB_URI}/HabeshaDress-E-commerce`);
};

export default ConnectDB;
