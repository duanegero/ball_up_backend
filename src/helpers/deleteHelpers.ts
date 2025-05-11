import { PrismaClient, Trainer, Athlete, Drill } from '@prisma/client';
const prisma = new PrismaClient();

//helper to delete traniers drills
const deleteTrainerDrills = async (trainer_user_id: number) => {
    try{
        return await prisma.drill.deleteMany({
            where: {trainer_user_id}
        })
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

//helper to delete trainer
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

const deleteDrillFromSessions = async (drill_id: number) => {
    try{
        return await prisma.session_Drill.deleteMany({
            where:{ drill_id }
        }) 
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

const deleteDrill = async (drill_id: number) => {
    try{
       return await prisma.drill.delete({
            where: {drill_id}
        })
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

export {deleteTrainerDrills, deleteTrainer, deleteDrillFromSessions, deleteDrill}