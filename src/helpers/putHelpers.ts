import { PrismaClient, Trainer, Athlete, Drill } from "@prisma/client";
const prisma = new PrismaClient();

//helper to put a tainer on a athlete
const putAthleteTrainer = async (
  athlete_user_id: number,
  trainer_user_id: number
) => {
  try {
    //check if trainer exists
    const trainerExists = await prisma.trainer.findUnique({
      where: { trainer_user_id },
    });

    //if not return null
    if (!trainerExists) {
      return null;
    }

    //query to update the row
    const updatedAthleteTrainer = await prisma.athlete.update({
      where: { athlete_user_id },
      data: { trainer_user_id },
      select: {
        athlete_user_id: true,
        first_name: true,
        last_name: true,
        email: true,
        age: true,
        level: true,
        trainer_user_id: true,
      },
    });

    //return updated row
    return updatedAthleteTrainer;
  } catch (error) {
    //catch if any errors, log and return null
    if (error instanceof Error) {
      console.error(error.message, error.stack);
    } else {
      console.error("An unknown error occurred", error);
    }
    return null;
  }
};

//helper to put trainer info
const putTrainer = async (
  trainer_user_id: number,
  updatedFields: Partial<Trainer>
) => {
  try {
    //check if trainer exist
    const trainerExists = await prisma.trainer.findUnique({
      where: { trainer_user_id },
    });

    //if not return null
    if (!trainerExists) {
      return null;
    }

    //filter out nulls and undfineds
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updatedFields).filter(
        ([_, value]) => value !== undefined && value !== null
      )
    );

    //if nothing found to update return null
    if (Object.keys(fieldsToUpdate).length === 0) {
      return null;
    }

    //prisma query to update
    const updatedTrainer = await prisma.trainer.update({
      where: { trainer_user_id },
      data: fieldsToUpdate,
      select: {
        trainer_user_id: true,
        first_name: true,
        last_name: true,
        email: true,
        years_experience: true,
        bio: true,
      },
    });

    //return results
    return updatedTrainer;
  } catch (error) {
    //catch if any errors, log and return null
    if (error instanceof Error) {
      console.error(error.message, error.stack);
    } else {
      console.error("An unknown error occurred", error);
    }
    return null;
  }
};

//helper to put athlete info
const putAthlete = async (
  athlete_user_id: number,
  updatedFields: Partial<Athlete>
) => {
  try {
    //check if athlete exists
    const athleteExists = await prisma.athlete.findUnique({
      where: { athlete_user_id },
    });

    //if not return null
    if (!athleteExists) {
      return null;
    }

    //filter out nulls and undfineds
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updatedFields).filter(
        ([_, value]) => value !== undefined && value !== null
      )
    );

    //if nothing found to update return null
    if (Object.keys(fieldsToUpdate).length === 0) {
      return null;
    }
    //prisma query to update
    const updatedAthlete = await prisma.athlete.update({
      where: { athlete_user_id },
      data: fieldsToUpdate,
      select: {
        athlete_user_id: true,
        first_name: true,
        last_name: true,
        email: true,
        age: true,
        level: true,
      },
    });
    //return results
    return updatedAthlete;
  } catch (error) {
    //catch if any errors, log and return null
    if (error instanceof Error) {
      console.error(error.message, error.stack);
    } else {
      console.error("An unknown error occurred", error);
    }
    return null;
  }
};

//helper to put drill info
const putDrill = async (drill_id: number, updatedFields: Partial<Drill>) => {
  try {
    const drillExists = await prisma.drill.findUnique({
      where: { drill_id },
    });

    if (!drillExists) {
      return null;
    }

    //filter out nulls and undfineds
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updatedFields).filter(
        ([_, value]) => value !== undefined && value !== null
      )
    );

    //if nothing found to update return null
    if (Object.keys(fieldsToUpdate).length === 0) {
      return null;
    }

    const updatedDrill = await prisma.drill.update({
      where: { drill_id },
      data: fieldsToUpdate,
      select: {
        drill_id: true,
        drill_type: true,
        description: true,
      },
    });
    return updatedDrill;
  } catch (error) {
    //catch if any errors, log and return null
    if (error instanceof Error) {
      console.error(error.message, error.stack);
    } else {
      console.error("An unknown error occurred", error);
    }
    return null;
  }
};

//helper to put athlete trainer null
const putAthleteTrainerNull = async (trainer_user_id: number) => {
  try {
    const update_athlete_trainer_null = await prisma.athlete.updateMany({
      where: { trainer_user_id },
      data: { trainer_user_id: null },
    });

    return update_athlete_trainer_null;
  } catch (error) {
    //catch if any errors, log and return null
    if (error instanceof Error) {
      console.error(error.message, error.stack);
    } else {
      console.error("An unknown error occurred", error);
    }
    return null;
  }
};

const putTrainerPassword = async (
  new_hash_password: string,
  trainer_user_id: number
): Promise<boolean> => {
  try {
    await prisma.trainer.update({
      where: { trainer_user_id },
      data: { hash_password: new_hash_password },
    });
    return true;
  } catch (error) {
    //catch if any errors, log and return null
    if (error instanceof Error) {
      console.error(error.message, error.stack);
    } else {
      console.error("An unknown error occurred", error);
    }
    return false;
  }
};

export {
  putAthleteTrainer,
  putTrainer,
  putAthlete,
  putDrill,
  putAthleteTrainerNull,
  putTrainerPassword,
};
