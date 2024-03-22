
import connectToDatabase from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
connectToDatabase();

// import express from "express";
// const app = express();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
//     app.on("Error", (error) => {
//       console.log("Error connecting to database", error);
//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}`);
//     });

//   } catch (error) {
//     console.log("Error connecting to database", error);
//     throw error;
//   }
// })();
