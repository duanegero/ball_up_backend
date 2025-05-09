import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getTrainers = async () => {
    try{
        //variable for prisma query
        const trainers = await prisma.trainer.findMany({
            orderBy: {created_at: "desc"},
            select: {
                trainer_user_id: true,
                first_name: true,
                last_name: true,
                email: true,
                years_experience: true,
                bio: true
            }
        })
        //return results 
        return trainers

    }catch (error) {
        //catch if any errors, log and return null
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return null
    }
}

const getAthletes = async () => {
    try{
        //variable for prisma query
        const athletes = await prisma.athlete.findMany({
            orderBy: {created_at: "desc"},
            select:{
                athlete_user_id: true,
                first_name: true,
                last_name: true,
                email: true,
                age: true,
                level: true

            }
        })
        //return results 
        return athletes
    }catch (error) {
        //catch if any errors, log and return null
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return null
    }
}

const getDrills = async () => {
    
    try{
        //variable for prisma query
        const drills = await prisma.drill.findMany({
            orderBy:{drill_type: "asc"},
            select: {
                drill_id: true,
                drill_type: true,
                description: true,
                level: true
            }
        })
        //return results 
        return drills
    }catch (error) {
        //catch if any errors, log and return null
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return null
    }
}

const getSessionDrills = async(session_id: number) => {

    try{
        //variable to handle prisma query
        const session_drills = await prisma.session_Drill.findMany({
            where:{session_id},
            include:{
                drill: {
                    select: {
                        drill_id: true,
                        drill_type: true,
                        description: true,
                        level: true
                    }
                }
            }
        })
        //return results
        return session_drills
    }catch (error) {
        //catch if any errors, log and return null
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return null
    }
}

const getTrainer = async (trainer_user_id: number) => {
    try{
        //variable to handle prisma query
        const trainer = await prisma.trainer.findUnique({
            where:{trainer_user_id},
            select:{
                trainer_user_id: true,
                email: true,
                first_name: true,
                last_name: true,
                years_experience: true,
                bio: true
            }
        })
        //return results
        return trainer
    }catch (error) {
        //catch if any errors, log and return null
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return null
    }
}

const getAthlete = async (athlete_user_id: number) => {
    try{
        //variable to handle prisma query
        const athlete = await prisma.athlete.findUnique({
            where:{athlete_user_id},
            select:{
                athlete_user_id: true,
                first_name: true,
                last_name: true,
                age: true,
                level: true,
                email: true
            }
        })
        //return results
        return athlete
    }catch (error) {
        //catch if any errors, log and return null
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return null
    }
}

export {getTrainers, getAthletes, getDrills, getSessionDrills, getTrainer, getAthlete}