import express, { Application } from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routes/user/auth";
import { pendingUserRouter } from "./routes/user/pendingUser";
import { authVerify } from "./middleware/authVerify";
import { announcementRouter } from "./routes/announcement";
import path from "path";

const app: Application = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin : ['*'],
 }

dotenv.config()

mongoose
	.connect(process.env.DB_URI!)
	.then((result) => {
		console.log('Connection successful: ', result.connection.name)
	})
	.catch((error) => {
		console.log('Connect error: ', error)
	})

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors())

app.use('/images', express.static(path.resolve(__dirname, "..", "public", "images")))

app.use('/api/auth', authRouter)
app.use('/api/pending-user', authVerify, pendingUserRouter)
app.use('/api/announcement', authVerify, announcementRouter);

app.listen(port, () => {
    console.log('=========================================')
	console.log(`Server is Fire at http://localhost:${port}`)
	console.log('=========================================')
})