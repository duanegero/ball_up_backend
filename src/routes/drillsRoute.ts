import express, {Router, Request, Response} from 'express'
import { postDrill } from '../helpers/postHelpers'
import { getDrills } from '../helpers/getHelpers'
const router: Router = express.Router()

//router to post a new drill
router.post("/", async (req: Request, res: Response) => {
    //getting the info from the request body
    const {drill_type, description, level} = req.body

    //if all fields aren't filled return error 
    if(!drill_type || !description || typeof level !== 'number'){
        return res.status(400).json({message: "Please provide all required fields."})   
    }

    try{
        //variable to handle call to helper function with passed in variables 
        const newDrill = await postDrill(drill_type, description, level)

        //if nothing returned, respond error status and message
        if(!newDrill){
            return res.status(500).json({message: "Error creating drill."})
        }

        //return success status and code 
        return res.status(201).json({message: "Drill created successfully"})
    }catch(error){
        //catch if any errors, respond codes and status 
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error creating drill."})
    }
})

//router to get all drills 
router.get("/", async (req: Request, res: Response) => {
    
    try{
        //call helper function
        const drills = await getDrills()

        //if nothing returned respond error status
        if(!drills){
            return res.status(500).json({message: "Error fetching drills."})
        }

        //respond success status
        res.status(200).json(drills)
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

//export to use in app
export {router as drillsRoute}