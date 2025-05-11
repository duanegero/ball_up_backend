import { PrismaClient, Trainer, Athlete, Drill } from '@prisma/client';
const prisma = new PrismaClient();

const deleteTrainerDrills = async (trainer_user_id: number) => {
    try{
        const delete_trainer_drills = await prisma.drill.deleteMany({
            where: {trainer_user_id}
        })
        return delete_trainer_drills
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

const deleteTrainer = async (trainer_user_id: number) => {
    try{
        const delete_trainer = await prisma.trainer.delete({
            where: {trainer_user_id}
        })

        return delete_trainer
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

export {deleteTrainerDrills, deleteTrainer}