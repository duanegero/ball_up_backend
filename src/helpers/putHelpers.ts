import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//helper to put a tainer on a athlete
const putAthleteTrainer = async (athlete_user_id: number, trainer_id: number) => {
    try{

        //check if trainer exists
        const trainerExists = await prisma.trainer.findUnique({
            where: { trainer_user_id: trainer_id }
        });
        
        //if not return null
        if (!trainerExists) {
            return null
        }
        
        //query to update the row
        const updatedAthleteTrainer = await prisma.athlete.update({
            where:{athlete_user_id},
            data:{trainer_id},
            select:{
                athlete_user_id: true,
                first_name: true,
                last_name: true,
                email: true,
                age: true,
                level: true,
                trainer_id: true
            }
        })

        //return updated row
        return updatedAthleteTrainer
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

export {putAthleteTrainer}