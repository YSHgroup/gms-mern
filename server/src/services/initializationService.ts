import fs from "fs";
import bcrypt from "bcrypt";
import path from "path";

import { isEmpty } from "@/utils/isEmpty";
import { Role } from "@/models/seedModel";
import { roles } from "@/constant";
import { User } from "@/models/userModel";

const dirPath_1 = path.resolve(__dirname, "../..", "public", "applications");
const dirPath_2 = path.resolve(__dirname, "../..", "public", "images");

const checkAndMakeDir = () => {
  let state = false;
	if (!fs.existsSync(dirPath_1)) {
		// Create the directory
    state = true
		fs.mkdirSync(dirPath_1, { recursive: true });
		console.log("Directory created: ", dirPath_1);
		// return true
	}
  if (!fs.existsSync(dirPath_2)) {
		// Create the directory
    state = true
		fs.mkdirSync(dirPath_2, { recursive: true });
		console.log("Directory created: ", dirPath_2);
		// return true
	} 
  if(!state) {
		console.log("Public directories already exist");
	}
};

const seedDatabase = async () => {
	Role.find({})
		.then((seed) => {
			if (isEmpty(seed)) {
				Role.insertMany(roles)
					.then((result) => {
						if (!isEmpty(result)) {
							console.log("Data was successfully seeded");
						} else {
							console.log("Initial data found.");
						}
					})
					.catch((error) => {
						throw Error(error.message);
					});
			} else {
        console.log("Roles exists already.");
      }
		})
		.catch((err) => {
			console.error("Failed to seed: ", err.message);
		});

	const salt = await bcrypt.genSalt(10);
	const hashedPwd = await bcrypt.hash("grantdirector", salt);

	const superUser = new User({
		role: "grant_dir",
		firstName: "Grant",
		lastName: "Director",
		email: "grantdirector@gmail.com",
		password: hashedPwd,
	});

	User.findOne({ role: "grant_dir" })
		.then((user) => {
			if (!isEmpty(user)) {
				superUser
					.save()
					.then(() => {
						console.log("Grant director seeded.");
					})
					.catch((err) => {
						throw new Error(err.message);
					});
			} else {
				console.log("Grant director exists.");
			}
		})
		.catch(() => {
			superUser
				.save()
				.then(() => {
					console.log("Grant director seeded.");
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		});
};

export default function initializeServer() {
	console.log("-----------------------------------");
	console.log("Checking server enviroment...");
	checkAndMakeDir();
	seedDatabase();
}
