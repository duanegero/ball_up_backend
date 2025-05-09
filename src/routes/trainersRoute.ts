import express, {Router, Request, Response} from 'express'
import bcrypt from 'bcrypt'
import {postTrainer} from '../helpers/postHelpers'
import { getTrainers, getTrainer, getTrainerAthletes } from '../helpers/getHelpers'
import { putTrainer } from '../helpers/putHelpers'
const router: Router = express.Router()

//router to post new trainer
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

//router to get all trainers 
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
    }
})

//router to get a trainer by id
router.get("/:id", async (req: Request, res: Response) => {
    //parse id from url
    const trainer_user_id = parseInt(req.params.id)

    try{
        //call to helper function
        const trainer = await getTrainer(trainer_user_id)

        //if nothing return return error status
        if(!trainer){
            return res.status(500).json({message: "Error fetching trainer."})
        }

        //return success status and json
        res.status(200).json(trainer)
    }catch (error) {
        //catch if any errors, respond codes and status 
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error fetching trainer."})
    }
})

//router to get trainers athletes
router.get("/athletes/:id", async (req: Request, res: Response) => {
    
    const trainer_user_id = parseInt(req.params.id)

    try{

        const trainer_athletes = await getTrainerAthletes(trainer_user_id)

        if(!trainer_athletes){
            return res.status(500).json({message: "Error fetching trainers athletes."})
        }

        res.status(200).json(trainer_athletes)

    }catch (error) {
        //catch if any errors, respond codes and status 
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error fetching trainers athletes."})
    }
})

//router to put a trainer 
router.put("/:id", async (req: Request, res: Response) => {
    //get id from the url
    const trainer_user_id = parseInt(req.params.id)
    //get the updates from body
    const updatedFields = req.body

    try{
        //call to helper function
        const updatedTrainer = await putTrainer(trainer_user_id, updatedFields)

        //if nothing returned respond error status
        if(!updatedTrainer){
            return res.status(404).json({message: "Error updating trainer."})
        }

        //respond success status 
        res.status(200).json(updatedTrainer)
    }catch (error) {
        //catch if any errors, respond codes and status 
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error updating trainer."})
    }
})

//export to use in app
export {router as trainersRoute}


