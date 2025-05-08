import express, {Router, Request, Response} from 'express'
import { postSession } from '../helpers/postHelpers'
const router: Router = express.Router()

router.post("/", async (req: Request, res: Response) => {
    //getting the info from the request body
    const {length, level} = req.body

    //if all fields aren't filled return error
    if(!length || !level){
        return res.status(400).json({message: "Please provide all required fields."})   
    }

    try{
        //variable to handle call to helper function with passed in variables 
        const newSession = await postSession(length, level)

        //if nothing returned, respond error status and message
        if(!newSession){
            return res.status(500).json({message: "Error creating session."})
        }

        //return success status and code 
        return res.status(201).json({message: "Session created successfully"})
    }catch(error){
        //catch if any errors, respond codes and status 
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error creating session."})
    }
})

//export to use in app
export {router as sessionsRoute}