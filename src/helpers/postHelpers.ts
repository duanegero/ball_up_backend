import { PrismaClient,Trainer } from '@prisma/client';
const prisma = new PrismaClient();


const postTrainer = async (email: string, username: string, hash_password: string, first_name: string, last_name: string, years_experience: number, bio: string): Promise<Trainer | null>  => {
    
    try{
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
        return newTrainer
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message, error.stack);
        } else {
            console.error("An unknown error occurred", error);
        }
        return null
    }
}

export { postTrainer }