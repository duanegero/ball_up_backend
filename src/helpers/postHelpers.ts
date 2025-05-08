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

        //check if athlete exists
        const athlete = await prisma.athlete.findUnique({
            where: {athlete_user_id}
        })

        //if doesn't exist log error return null
        if(!athlete){
            console.error(`Athlete with ID ${athlete_user_id} not found.`)
            return null
        }

        //check if session exists
        const session = await prisma.session.findUnique({
            where: {session_id}
        })

        //if doesn't exist log error return null
        if(!session){
            console.error(`Session with ID ${session_id} not found.`)
            return null
        }

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

const postSessionDrill = async (session_id: number, drill_id: number) => {
    
    try{

        //check if session exists
        const session = await prisma.session.findUnique({
            where: {session_id},
        })

        //if doesn't exist return error/null
        if(!session){
            console.error(`Session with ID ${session_id} not found.`)
            return null
        }

        //check if drill exists
        const drill = await prisma.drill.findUnique({
            where: {drill_id}
        })

        //if doesn't exist return error/null
        if(!drill){
            console.error(`Drill with ID ${drill_id} not found.`)
            return null
        }

        //prisma query to create new
        const newSessionDrill = await prisma.session_Drill.create({
            data:{
                session_id,
                drill_id
            }
        })
        //return result
        return newSessionDrill
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
export { postTrainer, postAthlete, postDrill, postSession, postAthleteSession, postSessionDrill }