import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//helper to delete traniers drills
const deleteTrainerDrills = async (trainer_user_id: number) => {
  try {
    return await prisma.drill.deleteMany({
      where: { trainer_user_id },
    });
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

//helper to delete trainer
const deleteTrainer = async (trainer_user_id: number) => {
  try {
    const delete_trainer = await prisma.trainer.delete({
      where: { trainer_user_id },
    });

    return delete_trainer;
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

//helper to delete drill from a session
const deleteDrillFromSessions = async (drill_id: number) => {
  try {
    return await prisma.session_Drill.deleteMany({
      where: { drill_id },
    });
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

//helper to delete a drill
const deleteDrill = async (drill_id: number) => {
  try {
    return await prisma.drill.delete({
      where: { drill_id },
    });
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

//helper to delete a athlete
const deleteAthlete = async (athlete_user_id: number) => {
  try {
    //prisma query to delete athlete
    return await prisma.athlete.delete({
      where: { athlete_user_id },
    });
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

//helper to delete an athletes sessions
const deleteAthleteSessions = async ({
  athlete_user_id,
  session_id,
}: {
  athlete_user_id?: number;
  session_id?: number;
}) => {
  try {
    //prisma query to delete athlete sessions
    return await prisma.athlete_Session.deleteMany({
      where: {
        ...(athlete_user_id !== undefined && { athlete_user_id }),
        ...(session_id !== undefined && { session_id }),
      },
    });
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

//helper to delete session drills
const deleteSessionDrills = async (session_id: number) => {
  try {
    //prisma query to delete session drill
    return await prisma.session_Drill.deleteMany({
      where: { session_id },
    });
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

//helper to delete session
const deleteSession = async (session_id: number) => {
  try {
    //prisma query to delete session
    return await prisma.session.delete({
      where: { session_id },
    });
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

//helper to delete drill from session
const deleteSessionDrill = async (drill_id: number, session_id: number) => {
  try {
    //prisma query to delete drill
    return await prisma.session_Drill.delete({
      where: {
        session_id_drill_id: {
          session_id: Number(session_id),
          drill_id,
        },
      },
    });
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

//helper to delete a athlete from a trainer
const deleteTrainersAthlete = async (
  athlete_user_id: number,
  trainer_user_id: number
) => {
  try {
    //variable to handle prisma query
    const athlete = await prisma.athlete.findUnique({
      where: { athlete_user_id },
    });

    //error if athlete not found
    if (!athlete) {
      throw new Error("Athlete not found.");
    }

    //error if athlete to assigned to trainer
    if (athlete.trainer_user_id !== trainer_user_id) {
      throw new Error(
        "Unauthorized: This athlete is not assigned to this trainer."
      );
    }
    //variable to handle prisma query to upddate
    const updatedAthlete = await prisma.athlete.update({
      where: { athlete_user_id },
      data: {
        trainer_user_id: null,
      },
    });

    //return to use in app
    return updatedAthlete;
  } catch (error) {
    //catch and log any errors
    console.error("Error removing trainer from athlete:", error);
    throw error;
  }
};

//helper to delete a athlete session
const deleteAthleteSession = async (
  athlete_user_id: number,
  session_id: number
) => {
  try {
    //variable to handle prisma query
    const deleted = await prisma.athlete_Session.delete({
      where: {
        athlete_user_id_session_id: {
          athlete_user_id,
          session_id,
        },
      },
    });
    //return result
    return deleted;
  } catch (error) {
    //catch and log if any errors
    console.error("Failed to delete athlete session:", error);
    throw error;
  }
};

//export helpers
export {
  deleteTrainerDrills,
  deleteTrainer,
  deleteDrillFromSessions,
  deleteDrill,
  deleteAthleteSessions,
  deleteAthlete,
  deleteSessionDrills,
  deleteSession,
  deleteSessionDrill,
  deleteTrainersAthlete,
  deleteAthleteSession,
};
