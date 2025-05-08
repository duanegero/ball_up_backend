import { PrismaClient,Trainer } from '@prisma/client';
const prisma = new PrismaClient();

//defining async function with passed in variables
const postTrainer = async (email: string, username: string, hash_password: string, first_name: string, last_name: string, years_experience: number, bio: string): Promise<Trainer | null>  => {
    
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
        const newAthlete = prisma.athlete.create({
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

export { postTrainer, postAthlete }