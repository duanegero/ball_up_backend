import express, {Router, Request, Response} from 'express'
import bcrypt from 'bcrypt'
import { postAthlete } from '../helpers/postHelpers'
const router: Router = express.Router()

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

export {router as athletesRoute}
