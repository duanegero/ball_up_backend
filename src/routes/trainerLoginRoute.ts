import express, { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { postTrainerLoginCredentials } from "../helpers/postHelpers";

const router: Router = express.Router();

//get api key from .env
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY is not set in environment variables.");
} else {
  console.log("API_KEY loaded successfully!");
}

//router to post trainer login
router.post("/", async (req: Request, res: Response) => {
  //get the info from the body
  const { username, password } = req.body;

  //if nothing in body respond error status
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password." });
  }

  try {
    //variable to handle helper function
    const trainer = await postTrainerLoginCredentials(username);

    //if nothing returned respond error status
    if (!trainer) {
      return res.status(400).json({ message: "Invalid username" });
    }

    //check if passwords match
    const passwordIsMatch = await bcrypt.compare(
      password,
      trainer.hash_password
    );

    //if no match respond error status
    if (!passwordIsMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    //variable to handle id
    const trainer_user_id = trainer.trainer_user_id;
    //variable to handle payload
    const payload = {
      trainer_user_id: trainer_user_id,
      username: trainer.username,
    };

    //creating a token with jwt
    const token = jwt.sign(payload, apiKey, { expiresIn: "1h" });

    //return success status and token
    return res.status(200).json({
      message: "Trainer logged in successfully.",
      token,
      trainer_user_id,
      username,
    });
  } catch (error) {
    //catch and log if any errors
    console.error("Error occurred during login", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export { router as trainerLoginRoute };
