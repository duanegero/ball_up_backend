import express, {Router, Request, Response} from 'express'
import { postSession, postSessionDrill } from '../helpers/postHelpers'
import { getSessionDrills, getSessions } from '../helpers/getHelpers'
const router: Router = express.Router()

//router to post a session
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

//router to post drill to session
router.post("/session_drills/:id", async (req: Request, res: Response) => {
    const session_id = parseInt(req.params.id)
    const {drill_id} = req.body

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

//route to get a sessions
router.get("/", async (req: Request, res: Response) => {
    
    try{
        //call helper function
        const sessions = await getSessions()

        //if nothing returned respond error status
        if(!sessions){
            return res.status(500).json({message: "Error fetching sessions."})
        }

        //return success status
        res.status(200).json(sessions)
    }catch (error) {
        //catch if any errors, respond codes and status 
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error fetching sessions."})
    }
})

//router to get a session's drills 
router.get("/session_drills/:id", async (req: Request, res: Response) => {
    //parse the id from the url
    const session_id = parseInt(req.params.id)

    try{
        //call to the helper 
        const session_drills = await getSessionDrills(session_id)

        //if nothing returned responed error status
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