import express, {Router, Request, Response} from 'express'
import bcrypt from 'bcrypt'
import { postAthlete, postAthleteSession } from '../helpers/postHelpers'
import { getAthletes, getAthlete, getAthleteSessions } from '../helpers/getHelpers'
const router: Router = express.Router()

//router to post a new athlete
router.post("/", async (req: Request, res: Response) => {
    //getting the info from the request body
    const {email, username, password, first_name, last_name, age, level} = req.body

    //if all fields aren't filled return error 
    if(!email || !username || !password || !first_name || !last_name || !age || !level){
        return res.status(400).json({message: "Please provide all required fields."})
    }

    try{
        //hashing the password 
        const hash_password: string = await bcrypt.hash(password, 10) 
        
        //variable to handle call to helper function with passed in variables 
        const newAthlete = await postAthlete(email, username, hash_password, first_name, last_name, age, level)

        //if nothing returned, respond error status and message
        if(!newAthlete){
            return res.status(500).json({message: "Error creating athlete"})
        }
        //return success status and code 
        return res.status(201).json({message: "Athlete created successfully."})
    }catch(error){
        //catch if any errors, respond codes and status 
        if(error instanceof Error){
            console.error(error.message, error.stack)
        }else{
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error creating athlete"})
    }
})

//router to post a new athlete session
router.post("/athlete_sessions", async (req:Request, res: Response) => {
    //getting the info from the request body
    const {athlete_user_id, session_id } = req.body

    //if all fields aren't filled return error 
    if(!athlete_user_id || !session_id){
        return res.status(400).json({message: "Please provide all required fields."})
    }

    try{
        //variable to handle call to helper function with passed in variables 
        const newAthleteSession = await postAthleteSession(athlete_user_id, session_id)

        //if nothing returned, respond error status and message
        if(!newAthleteSession){
            return res.status(500).json({message: "Error creating athlete session"})
        }

        //return success status and code 
        return res.status(201).json({message: "Athlete session created successfully"})
    }catch(error){
        //catch if any errors, respond codes and status 
        if(error instanceof Error){
            console.error(error.message, error.stack)
        }else{
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error creating athlete session"})
    }
})

//router to get all athletes
router.get("/", async (req: Request, res: Response) => {
    
    try{
        //call helper function
        const athletes = await getAthletes()

        //if nothing returned respond error status
        if(!athletes){
            return res.status(500).json({message: "Error fetching athletes."})
        }
        //respond success status
        res.status(200).json(athletes)
    }catch (error) {
        //catch if any errors, respond codes and status 
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error fetching athletes."})
    }
})

//router to get a single athlete by id
router.get("/:id", async (req: Request, res: Response) => {
    //parse id from url
    const athlete_user_id = parseInt(req.params.id)

    try{

        //call to helper function
        const athlete = await getAthlete(athlete_user_id)

        //if nothing return responed error
        if(!athlete){
            return res.status(500).json({ message: "Error fetching athlete." })
        }

        //respond success status
        res.status(200).json(athlete)
    }catch (error) {
        //catch if any errors, respond codes and status 
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error fetching athlete."})
    }
})

router.get("/athlete_sessions/:id", async (req: Request, res: Response) => {
    //parse id from url
    const athlete_user_id = parseInt(req.params.id)

    try{

        //call to helper function
        const athlete_sessions = await getAthleteSessions(athlete_user_id)

        //if nothing returned respond error status
        if(!athlete_sessions){
            return res.status(500).json({ message: "Error fetching athletes sessions." })
        }

        //respond ok statas and json
        res.status(200).json(athlete_sessions)
    }catch (error) {
        //catch if any errors, respond codes and status 
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error fetching athletes sessions."})
    }
})

export {router as athletesRoute}
