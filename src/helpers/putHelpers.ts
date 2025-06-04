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
        username: true,
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

    //filter out nulls and undefineds
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updatedFields).filter(
        ([_, value]) => value !== undefined && value !== null
      )
    );

    // Convert to number where needed
    if (
      fieldsToUpdate.level &&
      typeof fieldsToUpdate.level === "string" &&
      !isNaN(Number(fieldsToUpdate.level))
    ) {
      fieldsToUpdate.level = Number(fieldsToUpdate.level);
    }

    // Convert to number where needed
    if (
      fieldsToUpdate.age &&
      typeof fieldsToUpdate.age === "string" &&
      !isNaN(Number(fieldsToUpdate.age))
    ) {
      fieldsToUpdate.age = Number(fieldsToUpdate.age);
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

//helper to put trainer password
const putTrainerPassword = async (
  new_hash_password: string,
  trainer_user_id: number
): Promise<boolean> => {
  try {
    //prisma query to update password
    await prisma.trainer.update({
      where: { trainer_user_id },
      data: { hash_password: new_hash_password },
    });
    //return true if success
    return true;
  } catch (error) {
    //catch if any errors, log and return false
    if (error instanceof Error) {
      console.error(error.message, error.stack);
    } else {
      console.error("An unknown error occurred", error);
    }
    return false;
  }
};

//helper to put athlete password
const putAthletePassword = async (
  new_hash_password: string,
  athlete_user_id: number
): Promise<boolean> => {
  try {
    //prisma query to update password
    await prisma.athlete.update({
      where: { athlete_user_id },
      data: { hash_password: new_hash_password },
    });
    //return true
    return true;
  } catch (error) {
    //catch if any errors, log and return false
    if (error instanceof Error) {
      console.error(error.message, error.stack);
    } else {
      console.error("An unknown error occurred", error);
    }
    return false;
  }
};

const putAthleteSession = async (
  athlete_user_id: number,
  session_id: number
): Promise<boolean> => {
  try {
    console.log("Updating athlete_session with:", athlete_user_id, session_id);

    const result = await prisma.athlete_Session.update({
      where: {
        athlete_user_id_session_id: {
          athlete_user_id,
          session_id,
        },
      },
      data: {
        completed: true,
      },
    });

    console.log("Update result:", result);

    return true;
  } catch (error) {
    console.error("Error during update:", error);
    throw error;
  }
};

export {
  putAthleteTrainer,
  putTrainer,
  putAthlete,
  putDrill,
  putAthleteTrainerNull,
  putTrainerPassword,
  putAthletePassword,
  putAthleteSession,
};
