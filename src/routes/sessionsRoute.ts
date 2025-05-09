import express, {Router, Request, Response} from 'express'
import { postSession, postSessionDrill } from '../helpers/postHelpers'
import { getSessionDrills } from '../helpers/getHelpers'
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

router.post("/session_drills", async (req: Request, res: Response) => {
    const {session_id, drill_id} = req.body

    if(!session_id || !drill_id){
        return res.status(400).json({message: "Please provide all required fields."})   
    }

    try{
        const newSessionDrill = await postSessionDrill(session_id, drill_id)

        if(!newSessionDrill){
            return res.status(500).json({message: "Error creating session drill."})
        }

        //return success status and code 
        return res.status(201).json({message: "Session drill created successfully"})
    }catch(error){
        //catch if any errors, respond codes and status 
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error creating session drill."})
    }
})

router.get("/session_drills/:id", async (req: Request, res: Response) => {
    const session_id = parseInt(req.params.id)

    try{
        const session_drills = await getSessionDrills(session_id)

        if(!session_drills){
            return res.status(500).json({message: "Error fetching session drills."})
        }

        //respond success status
        res.status(200).json(session_drills)
    }catch (error) {
        //catch if any errors, respond codes and status 
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error fetching session drills."})
    }
})

//export to use in app
export {router as sessionsRoute}