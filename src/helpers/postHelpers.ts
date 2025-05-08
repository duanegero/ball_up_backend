import { PrismaClient,Trainer } from '@prisma/client';
const prisma = new PrismaClient();

//defining async function with passed in variables
const postTrainer = async (email: string, username: string, hash_password: string, first_name: string, last_name: string, years_experience: number, bio: string)  => {
    
    try{
        //variable to handle prisma query to create
        const newTrainer = await prisma.trainer.create({
            data: {
                email,
                username,
                hash_password,
                first_name,
                last_name,
                years_experience,
                bio,
            },
    })
        //return new trainer data from db
        return newTrainer
    }
    catch (error) {
        //catch if any errors, log and return null
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return null
    }
}

const postAthlete = async (email: string, username: string, hash_password: string, first_name: string, last_name: string, age: number, level: number) => {
    
    try{
        const newAthlete = await prisma.athlete.create({
            data:{
                email,
                username,
                hash_password,
                first_name,
                last_name,
                age,
                level
            },
        })
        return newAthlete
    }catch(error){
        //catch if any errors, log and return null
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return null
    }
}

const postDrill = async(drill_type: string, description: string, level: number) => {

    try{
        const newDrill = await prisma.drill.create({
            data: {
                drill_type,
                description,
                level
            }
        })
        return newDrill
    }catch(error){
        //catch if any errors, log and return null
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return null
    }
}

const postSession = async(length: number, level: number) => {

    try{
        const newSession = await prisma.session.create({
            data:{
                length,
                level
            }
        })
        return newSession
    }catch(error){
        //catch if any errors, log and return null
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return null
    }
}

const postAthleteSession = async (athlete_user_id: number, session_id: number) => {
    
    try{
        const newAthleteSession = await prisma.athlete_Session.create({
            data:{
                athlete_user_id,
                session_id
            }
        })
        return newAthleteSession
    }catch(error){
        //catch if any errors, log and return null
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return null
    }
}
export { postTrainer, postAthlete, postDrill, postSession, postAthleteSession }