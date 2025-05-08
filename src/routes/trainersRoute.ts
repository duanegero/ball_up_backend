import express, {Router, Request, Response} from 'express'
import bcrypt from 'bcrypt'
import {postTrainer} from '../helpers/postHelpers'
import { getTrainers } from '../helpers/getHelpers'
const router: Router = express.Router()

router.post("/", async (req: Request, res: Response) => {
    //getting the info from the request body
    const {email, username, password, first_name, last_name, years_experience, bio} = req.body

    //if all fields aren't filled return error 
    if(!email || !username || !password || !first_name || !last_name || !years_experience || !bio) {
        return res.status(400).json({message: "Please provide all required fields."})
    }

    try {
        //hashing the password 
        const hash_password: string = await bcrypt.hash(password, 10)

        //variable to handle call to helper function with passed in variables 
        const newTrainer = await postTrainer(email, username, hash_password, first_name, last_name, years_experience, bio)
        
        //if nothing returned, respond error status and message
        if(!newTrainer) {
            return res.status(500).json({message: "Error creating trainer."})
        }
        //return success status and code 
        return res.status(201).json({message: "Trainer created successfully."})
    } catch (error) {
        //catch if any errors, respond codes and status 
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error creating trainer."})
    }
})

router.get("/", async (req: Request, res: Response) => {
    
    try{
        //call helper function
        const trainers = await getTrainers()

        //if nothing returned respond error status
        if(!trainers){
            return res.status(500).json({message: "Error fetching trainers."})
        }
        //respond success status
        res.status(200).json(trainers)
    }catch (error) {
        //catch if any errors, respond codes and status 
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error fetching trainers."})
}}
)

//export to use in app
export {router as trainersRoute}


