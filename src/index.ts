import express, { Express, Request, Response, response } from "express";
import dotenv from "dotenv";
import * as mongoose from "mongoose";
import * as CallRecords from "./Services/CallRecords";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const mongo = process.env.MONGO_URI;

// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });

// convertResponseDateToDom();

mongoose.connect(`${mongo}`);
CallRecords.startCallRecording();
