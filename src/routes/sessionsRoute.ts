import express, { Router, Request, Response } from "express";
import { postSession, postSessionDrill } from "../helpers/postHelpers";
import { getSessionDrills, getSessions } from "../helpers/getHelpers";
import {
  deleteAthleteSessions,
  deleteSessionDrills,
  deleteSession,
} from "../helpers/deleteHelpers";
import { logError } from "../helpers/logError";
import { trainerVerifyToken } from "../middleware/trainerVerifyToken";
import { athleteVerifyToken } from "../middleware/athleteVerifyToken";
const router: Router = express.Router();

//router to post a session
router.post("/", async (req: Request, res: Response) => {
  //getting the info from the request body
  const { length, level, session_name, trainer_user_id } = req.body;

  //if all fields aren't filled return error
  if (typeof length !== "number" || typeof level !== "number") {
    return res
      .status(400)
      .json({ message: "Length and level must be numbers." });
  }

  try {
    //variable to handle call to helper function with passed in variables
    const newSession = await postSession(
      length,
      level,
      session_name,
      trainer_user_id
    );

    //if nothing returned, respond error status and message
    if (!newSession) {
      return res.status(500).json({ message: "Error creating session." });
    }

    //return success status and code
    return res
      .status(201)
      .json({ message: "Session created successfully", newSession });
  } catch (error) {
    //catch if any errors, respond codes and status
    logError(error);
    return res.status(500).json({ message: "Error creating session." });
  }
});

//router to post drill to session
router.post(
  "/session_drills/:id",
  trainerVerifyToken,
  async (req: Request, res: Response) => {
    const session_id = parseInt(req.params.id);
    const { drill_id } = req.body;

    // Check if either session_id or drill_id is not a number
    if (isNaN(session_id) || typeof drill_id !== "number" || isNaN(drill_id)) {
      return res
        .status(400)
        .json({ message: "Invalid session ID or drill ID." });
    }

    try {
      //variable to handle helper function call
      const newSessionDrill = await postSessionDrill(session_id, drill_id);

      //if nothing returned respond error status
      if (!newSessionDrill) {
        return res
          .status(500)
          .json({ message: "Error creating session drill." });
      }

      //return success status and code
      return res
        .status(201)
        .json({ message: "Session drill created successfully" });
    } catch (error) {
      //catch if any errors, respond codes and status
      logError(error);
      return res.status(500).json({ message: "Error creating session drill." });
    }
  }
);

//route to get a sessions
router.get("/", athleteVerifyToken, async (req: Request, res: Response) => {
  try {
    //call helper function
    const sessions = await getSessions();

    //if nothing returned respond error status
    if (!sessions) {
      return res.status(500).json({ message: "Error fetching sessions." });
    }

    //return success status
    res.status(200).json(sessions);
  } catch (error) {
    //catch if any errors, respond codes and status
    logError(error);
    return res.status(500).json({ message: "Error fetching sessions." });
  }
});

//router to get a session's drills
router.get(
  "/session_drills/:id",
  athleteVerifyToken,
  async (req: Request, res: Response) => {
    //parse the id from the url
    const session_id = parseInt(req.params.id);

    //check if id is a number
    if (isNaN(session_id)) {
      return res.status(400).json({ message: "Please provide valid ID" });
    }

    try {
      //call to the helper
      const session_drills = await getSessionDrills(session_id);

      //if nothing returned responed error status
      if (!session_drills) {
        return res
          .status(500)
          .json({ message: "Error fetching session drills." });
      }

      //respond success status
      res.status(200).json(session_drills);
    } catch (error) {
      //catch if any errors, respond codes and status
      logError(error);
      return res
        .status(500)
        .json({ message: "Error fetching session drills." });
    }
  }
);

//router to delete a session
router.delete(
  "/:id",
  trainerVerifyToken,
  async (req: Request, res: Response) => {
    //get id from url
    const session_id = parseInt(req.params.id);

    //check if id is a number
    if (isNaN(session_id)) {
      return res.status(400).json({ message: "Please provide valid ID" });
    }

    try {
      //calls to helper functions
      await deleteSessionDrills(session_id);
      await deleteAthleteSessions({ session_id });
      await deleteSession(session_id);

      //respond success status
      res.status(200).json({ message: `Session ${session_id} deleted.` });
    } catch (error) {
      //catch if any errors, respond codes and status
      logError(error);
      return res.status(500).json({ message: "Error deleting session." });
    }
  }
);

//export to use in app
export { router as sessionsRoute };
