import express, { Router, Request, Response } from "express";
import { postDrill } from "../helpers/postHelpers";
import { getDrills } from "../helpers/getHelpers";
import { putDrill } from "../helpers/putHelpers";
import { deleteDrillFromSessions, deleteDrill } from "../helpers/deleteHelpers";
import { logError } from "../helpers/logError";
import { trainerVerifyToken } from "../middleware/trainerVerifyToken";
const router: Router = express.Router();

//router to post a new drill
router.post("/", trainerVerifyToken, async (req: Request, res: Response) => {
  //getting the info from the request body
  const { drill_type, description, level, trainer_user_id } = req.body;

  //if all fields aren't filled return error
  if (
    !drill_type ||
    !description ||
    typeof level !== "number" ||
    !trainer_user_id
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  try {
    //variable to handle call to helper function with passed in variables
    const newDrill = await postDrill(
      drill_type,
      description,
      level,
      trainer_user_id
    );

    //if nothing returned, respond error status and message
    if (!newDrill) {
      return res.status(500).json({ message: "Error creating drill." });
    }

    //return success status and code
    return res
      .status(201)
      .json({ message: "Drill created successfully", newDrill });
  } catch (error) {
    //catch if any errors, respond codes and status
    logError(error);
    return res.status(500).json({ message: "Error creating drill." });
  }
});

//router to get all drills
router.get("/", trainerVerifyToken, async (req: Request, res: Response) => {
  try {
    //call helper function
    const drills = await getDrills();

    //if nothing returned respond error status
    if (!drills) {
      return res.status(500).json({ message: "Error fetching drills." });
    }

    //respond success status
    res.status(200).json({ message: "Drills", drills });
  } catch (error) {
    //catch if any errors, respond codes and status
    logError(error);
    return res.status(500).json({ message: "Error fetching drills." });
  }
});

//router to put a drill
router.put("/:id", trainerVerifyToken, async (req: Request, res: Response) => {
  //get id from url
  const drill_id = parseInt(req.params.id);

  //check if id is a number
  if (isNaN(drill_id)) {
    return res.status(400).json({ message: "Invalid drill ID." });
  }

  //get info from request body
  const updatedFields = req.body;

  try {
    //variable to handle helper function
    const updatedDrill = await putDrill(drill_id, updatedFields);

    //if nothing returned, respond error status
    if (!updatedDrill) {
      return res.status(404).json({ message: "Error updating drill." });
    }

    //respond success status
    res.status(200).json({ message: "Updated Drill", updatedDrill });
  } catch (error) {
    //catch if any errors, respond codes and status
    logError(error);
    return res.status(500).json({ message: "Error updating drill." });
  }
});

//router to delete a drill
router.delete(
  "/:id",
  trainerVerifyToken,
  async (req: Request, res: Response) => {
    //get the id from url
    const drill_id = parseInt(req.params.id);

    //check if id is a number
    if (isNaN(drill_id)) {
      return res.status(400).json({ message: "Invalid drill ID." });
    }

    try {
      //call helper functions
      await deleteDrillFromSessions(drill_id);
      await deleteDrill(drill_id);

      //respond success status
      res.status(200).json({ message: `Drill ${drill_id} deleted.` });
    } catch (error) {
      //catch if any errors, respond codes and status
      logError(error);
      return res.status(500).json({ message: "Error deleting drill." });
    }
  }
);

//export to use in app
export { router as drillsRoute };
