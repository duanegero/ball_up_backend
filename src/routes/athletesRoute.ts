import express, {Router, Request, Response} from 'express'
import bcrypt from 'bcrypt'
import { postAthlete, postAthleteSession } from '../helpers/postHelpers'
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

export {router as athletesRoute}
