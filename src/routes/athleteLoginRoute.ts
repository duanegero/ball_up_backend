import express, { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { postAthleteLoginCredentials } from "../helpers/postHelpers";

const router: Router = express.Router();

//get api key from .env
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY is not set in environment variables.");
} else {
  console.log("API_KEY loaded successfully!");
}

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
    const athlete = await postAthleteLoginCredentials(username);

    //if nothing returned respond error status
    if (!athlete) {
      return res.status(400).json({ message: "Invalid username" });
    }

    //check if passwords match
    const passwordIsMatch = await bcrypt.compare(
      password,
      athlete.hash_password
    );

    //if no match respond error status
    if (!passwordIsMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    //variable to handle ID
    const athlete_user_id = athlete.athlete_user_id;

    //variable to handle payload
    const payload = {
      athlete_user_id: athlete_user_id,
      username: athlete.username,
    };

    //making a token
    const token = jwt.sign(payload, apiKey, { expiresIn: "1h" });

    //respond success status
    return res.status(200).json({
      message: "Athlete logged in successfully.",
      token,
      athlete_user_id,
      username,
    });
  } catch (error) {
    //catch and log if any errors
    console.error("Error occurred during login", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export { router as athleteLoginRoute };
