import express, { Application } from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
// import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

import { authRouter } from "./routes/user/auth";
import { pendingUserRouter } from "./routes/user/pendingUser";
import { authVerify } from "./middleware/authVerify";
import { announcementRouter } from "./routes/announcement";
import { profileRouter } from "./routes/user/profile";
import { applicationRouter } from "./routes/grantApplication/application";
import { requestProcessRouter } from "./routes/grantApplication/requestProcess";
import { seedRouter } from "./routes/seed";
import initializeServer from "./services/initializationService";
import { reviewerRouter } from "./routes/user/reviewers";

const app: Application = express();
const port = process.env.PORT || 8000;
const corsOptions = {
	origin: ["*"],
};

dotenv.config();

// mongoose connect
mongoose
	.connect(process.env.DB_URI!)
	.then((result) => {
		console.log("Connection successful: ", result.connection.name);
		initializeServer();
	})
	.catch((error) => {
		console.log("Connect error: ", error);
	});

// middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

// Serve static data
app.use(
	"/images",
	express.static(path.resolve(__dirname, "..", "public", "images"))
);
app.use(
	"/reviews",
	express.static(path.resolve(__dirname, "..", "public", "reviews"))
);
app.use(
	"/application",
	express.static(path.resolve(__dirname, "..", "public", "applications"))
);
app.use(
	"/additional_doc",
	express.static(path.resolve(__dirname, "..", "public", "additional_doc"))
);

// router
app.use("/api/auth", authRouter);
app.use("/api/seed", seedRouter);

app.use("/api/pending-user", authVerify, pendingUserRouter);
app.use("/api/announcement", authVerify, announcementRouter);
app.use("/api/user", authVerify, profileRouter);
app.use("/api/grant-application", authVerify, [
	applicationRouter,
	requestProcessRouter,
]);
app.use("/api/reviewer", authVerify, reviewerRouter);

// Create socket server
const io = new Server(
	app.listen(port, () => {
		console.log("=========================================");
		console.log(`Server is Fire at http://localhost:${port}`);
		console.log(`Socket Server is available at same port`);
		console.log("=========================================");
	}),
	{
		cors: {
			origin: "*",
			credentials: true
		},
		connectionStateRecovery: {
			maxDisconnectionDuration: 2 * 60 * 1000,
			skipMiddlewares: true,
		},
	}
);

io.engine.generateId = (req) => {
	return uuidv4(); // must be unique across all Socket.IO servers
};

io.on("connection", (socket) => {
	console.log('A user connected: ' ,socket.id);

	socket.on('disconnect', () => {
        console.log(`A user disconnected: ${socket.id}`);
    });
});

export {io}