// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { app } from "../app.js";


// dotenv.config({
//   path: "./.env"
// });

// //set up default mongoose connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("MongoDB connected");
//     console.log("Connected to DB:", mongoose.connection.name);


//     app.listen(process.env.PORT || 3000, () => {
//       console.log(`Server is running at port : ${process.env.PORT || 3000}`);
//     });


//   } catch (error) {
//     console.error("MongoDB connection failed:", error);
//     process.exit(1);
//   }
// };


// connectDB();


import mongoose from "mongoose";
import app from "../app.js";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
  console.log("MongoDB connected");
};

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}