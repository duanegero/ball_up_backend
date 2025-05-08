import express, {Router, Request, Response} from 'express'

import bcrypt from 'bcrypt'

import {postTrainer} from '../helpers/postHelpers'

interface TrainerData {
    email: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    years_experience: number;
    bio: string;
}

const router: Router = express.Router()

router.post("/", async (req: Request, res: Response) => {
    
    const {email, username, password, first_name, last_name, years_experience, bio} = req.body

    if(!email || !username || !password || !first_name || !last_name || !years_experience || !bio) {
        return res.status(400).json({message: "Please provide all required fields."})
    }

    try {
        const hash_password: string = await bcrypt.hash(password, 10)

        const newTrainer = await postTrainer(email, username, hash_password, first_name, last_name, years_experience, bio)
        
        if(!newTrainer) {
            return res.status(500).json({message: "Error creating trainer."})
        }
        return res.status(201).json({message: "Trainer created successfully."})
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return res.status(500).json({message: "Error creating trainer."})
    }
})

export {router as trainersRoute}


