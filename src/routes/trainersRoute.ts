import express, { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { postTrainer } from "../helpers/postHelpers";
import {
  getTrainers,
  getTrainer,
  getTrainerAthletes,
  getTrainerDrills,
  getTrainerUsernamePassword,
  getTrainerSessions,
} from "../helpers/getHelpers";
import {
  putAthleteTrainerNull,
  putTrainer,
  putTrainerPassword,
} from "../helpers/putHelpers";
import {
  deleteTrainerDrills,
  deleteTrainer,
  deleteTrainersAthlete,
} from "../helpers/deleteHelpers";
import { logError } from "../helpers/logError";
import { trainerVerifyToken } from "../middleware/trainerVerifyToken";
const router: Router = express.Router();

//router to post new trainer
router.post("/", async (req: Request, res: Response) => {
  //getting the info from the request body
  const {
    email,
    username,
    password,
    first_name,
    last_name,
    years_experience,
    bio,
  } = req.body;

  //if all fields aren't filled return error
  if (
    !email ||
    !username ||
    !password ||
    !first_name ||
    !last_name ||
    years_experience === undefined ||
    bio === undefined
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  try {
    //hashing the password
    const hash_password: string = await bcrypt.hash(password, 10);

    //variable to handle call to helper function with passed in variables
    const newTrainer = await postTrainer(
      email,
      username,
      hash_password,
      first_name,
      last_name,
      years_experience,
      bio
    );

    //if nothing returned, respond error status and message
    if (!newTrainer) {
      return res.status(500).json({ message: "Error creating trainer." });
    }
    //return success status and code
    return res.status(201).json({
      message: "Trainer created successfully.",
      username: newTrainer.username,
    });
  } catch (error) {
    //catch if any errors, respond codes and status
    logError(error);
    return res.status(500).json({ message: "Error creating trainer." });
  }
});

//router to get all trainers
router.get("/", async (req: Request, res: Response) => {
  try {
    //call helper function
    const trainers = await getTrainers();

    //if nothing returned respond error status
    if (!trainers) {
      return res.status(500).json({ message: "Error fetching trainers." });
    }
    //respond success status
    res.status(200).json(trainers);
  } catch (error) {
    //catch if any errors, respond codes and status
    logError(error);
    return res.status(500).json({ message: "Error fetching trainers." });
  }
});

//router to get a trainer by id
router.get("/:id", async (req: Request, res: Response) => {
  //parse id from url
  const trainer_user_id = parseInt(req.params.id);

  //check if id is a number
  if (isNaN(trainer_user_id)) {
    return res.status(400).json({ message: "Please provide valid ID" });
  }

  try {
    //call to helper function
    const trainer = await getTrainer(trainer_user_id);

    //if nothing return return error status
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found." });
    }

    //return success status and json
    res.status(200).json(trainer);
  } catch (error) {
    //catch if any errors, respond codes and status
    logError(error);
    return res.status(500).json({ message: "Error fetching trainer." });
  }
});

//router to get trainers athletes
router.get("/athletes/:id", async (req: Request, res: Response) => {
  //getting id from url
  const trainer_user_id = parseInt(req.params.id);

  //check if id is a number
  if (isNaN(trainer_user_id)) {
    return res.status(400).json({ message: "Please provide valid ID" });
  }

  try {
    //call to helper function
    const trainer_athletes = await getTrainerAthletes(trainer_user_id);

    //if nothing return respond error status
    if (!trainer_athletes) {
      return res
        .status(500)
        .json({ message: "Error fetching trainers athletes." });
    }

    //return success status
    res.status(200).json(trainer_athletes);
  } catch (error) {
    //catch if any errors, respond codes and status
    logError(error);
    return res
      .status(500)
      .json({ message: "Error fetching trainers athletes." });
  }
});

//router to get all trainers drills
router.get("/drills/:id", async (req: Request, res: Response) => {
  //getting id from url
  const trainer_user_id = parseInt(req.params.id);

  //check if id is a number
  if (isNaN(trainer_user_id)) {
    return res.status(400).json({ message: "Please provide valid ID" });
  }

  try {
    //call to helper function
    const trainer_drills = await getTrainerDrills(trainer_user_id);

    //if nothing return respond error status
    if (!trainer_drills) {
      return res
        .status(500)
        .json({ message: "Error fetching trainers drills." });
    }

    res.status(200).json(trainer_drills);
  } catch (error) {
    //catch if any errors, respond codes and status
    logError(error);
    return res.status(500).json({ message: "Error fetching trainers drills." });
  }
});

//route to get trainers sessions
router.get("/sessions/:id", async (req: Request, res: Response) => {
  //getting id from url
  const trainer_user_id = parseInt(req.params.id);

  //check if id is a number
  if (isNaN(trainer_user_id)) {
    return res.status(400).json({ message: "Please provide valid ID" });
  }

  try {
    //call to helper function
    const trainer_sessions = await getTrainerSessions(trainer_user_id);

    //if nothing return respond error status
    if (!trainer_sessions) {
      return res
        .status(500)
        .json({ message: "Error fetching trainers drills." });
    }

    res.status(200).json(trainer_sessions);
  } catch (error) {
    //catch if any errors, respond codes and status
    logError(error);
    return res
      .status(500)
      .json({ message: "Error fetching trainers sessions." });
  }
});

//router to put a trainer
router.put("/:id", async (req: Request, res: Response) => {
  //get id from the url
  const trainer_user_id = parseInt(req.params.id);

  //check if id is a number
  if (isNaN(trainer_user_id)) {
    return res.status(400).json({ message: "Please provide valid ID" });
  }

  //get the updates from body
  const updatedFields = req.body;

  try {
    //call to helper function
    const updatedTrainer = await putTrainer(trainer_user_id, updatedFields);

    //if nothing returned respond error status
    if (!updatedTrainer) {
      return res.status(404).json({ message: "Error updating trainer." });
    }

    //respond success status
    res.status(200).json(updatedTrainer);
  } catch (error) {
    //catch if any errors, respond codes and status
    logError(error);
    return res.status(500).json({ message: "Error updating trainer." });
  }
});

//router to put a trainer password
router.put("/password/:id", async (req: Request, res: Response) => {
  //get id from the url
  const trainer_user_id = parseInt(req.params.id);
  //check if id is a number
  if (isNaN(trainer_user_id)) {
    return res.status(400).json({ message: "Please provide valid ID" });
  }

  //get the old and new password
  const { currentPassword, newPassword } = req.body;

  //if nothing in the body respond error status
  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Both current and new passwords are required." });
  }

  try {
    //varible to check for trainer
    const trainer = await getTrainerUsernamePassword(trainer_user_id);

    //if nothing found respond error status
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found." });
    }

    //check if old password match
    const passwordIsMatch = await bcrypt.compare(
      currentPassword,
      trainer.hash_password
    );
    //if no match respond error status
    if (!passwordIsMatch) {
      return res
        .status(401)
        .json({ message: "Current password is incorrect." });
    }

    //hash the new password
    const new_hash_password: string = await bcrypt.hash(newPassword, 10);

    //update password in db
    await putTrainerPassword(new_hash_password, trainer_user_id);

    //respond success status
    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    //catch if any errors, respond codes and status
    logError(error);
    return res
      .status(500)
      .json({ message: "Error updating trainer password." });
  }
});

//router to delete a trainer
router.delete("/:id", async (req: Request, res: Response) => {
  //get id from the url
  const trainer_user_id = parseInt(req.params.id);

  //check if id is a number
  if (isNaN(trainer_user_id)) {
    return res.status(400).json({ message: "Please provide valid ID" });
  }

  try {
    //helper to delete drills
    await deleteTrainerDrills(trainer_user_id);

    //update athletes trainer
    await putAthleteTrainerNull(trainer_user_id);

    //delete trainer
    await deleteTrainer(trainer_user_id);

    //return success status
    res.status(200).json({ message: `Trainer ${trainer_user_id} deleted.` });
  } catch (error) {
    //catch if any errors, respond codes and status
    logError(error);
    return res.status(500).json({ message: "Error deleting trainer." });
  }
});

//router to delete althlete from trainers list
router.delete(`/athlete/:id`, async (req: Request, res: Response) => {
  //getting IDs from request
  const athlete_user_id = parseInt(req.params.id);
  const { trainer_user_id } = req.body;

  try {
    //variable to handle helper
    const deletedAthlete = await deleteTrainersAthlete(
      athlete_user_id,
      trainer_user_id
    );

    //response success status
    return res.status(200).json({
      message: "Athlete removed successfully.",
      athlete: deletedAthlete.athlete_user_id,
    });
  } catch (error) {
    //catch if any errors, respond codes and status
    logError(error);
    return res
      .status(500)
      .json({ message: "Error deleting trainers athlete." });
  }
});

//export to use in app
export { router as trainersRoute };
