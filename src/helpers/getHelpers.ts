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

export {getTrainers}