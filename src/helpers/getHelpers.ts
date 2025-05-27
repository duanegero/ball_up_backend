import { PrismaClient, DrillType } from "@prisma/client";
const prisma = new PrismaClient();

//helper to get all trainer
const getTrainers = async () => {
  try {
    //variable for prisma query
    const trainers = await prisma.trainer.findMany({
      orderBy: { created_at: "desc" },
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
    return trainers;
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

//helper to get all athletes
const getAthletes = async () => {
  try {
    //variable for prisma query
    const athletes = await prisma.athlete.findMany({
      orderBy: { created_at: "desc" },
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
    return athletes;
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

//helper to get all drills
const getDrills = async () => {
  try {
    //variable for prisma query
    const drills = await prisma.drill.findMany({
      orderBy: { drill_type: "asc" },
      select: {
        drill_id: true,
        drill_type: true,
        description: true,
        level: true,
        trainer_user_id: true,
      },
    });
    //return results
    return drills;
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

//helper to get the drills by type
const getDrillsByType = async (drill_type: DrillType) => {
  try {
    //varaible to handle prisma query
    const drills = await prisma.drill.findMany({
      where: { drill_type: drill_type },
      select: {
        drill_name: true,
        description: true,
        level: true,
        trainer_user_id: true,
      },
    });

    //return all found
    return drills;
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

//helper to get all sessions
const getSessions = async () => {
  try {
    //variable for prisma query
    const sessions = await prisma.session.findMany({
      orderBy: { created_at: "desc" },
      select: {
        session_id: true,
        length: true,
        level: true,
        created_at: true,
      },
    });
    //return results
    return sessions;
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

//helper to get session drills
const getSessionDrills = async (session_id: number) => {
  try {
    //variable to handle prisma query
    const session_drills = await prisma.session_Drill.findMany({
      where: { session_id },
      include: {
        drill: {
          select: {
            drill_id: true,
            drill_type: true,
            description: true,
            level: true,
            drill_name: true,
          },
        },
      },
    });
    //return results
    return session_drills;
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

//helper to get a single trainer
const getTrainer = async (trainer_user_id: number) => {
  try {
    //variable to handle prisma query
    const trainer = await prisma.trainer.findUnique({
      where: { trainer_user_id },
      select: {
        trainer_user_id: true,
        username: true,
        email: true,
        first_name: true,
        last_name: true,
        years_experience: true,
        bio: true,
      },
    });
    //return results
    return trainer;
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

//helper to get a single athlete
const getAthlete = async (athlete_user_id: number) => {
  try {
    //variable to handle prisma query
    const athlete = await prisma.athlete.findUnique({
      where: { athlete_user_id },
      select: {
        athlete_user_id: true,
        first_name: true,
        last_name: true,
        age: true,
        level: true,
        email: true,
      },
    });
    //return results
    return athlete;
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

//helper to get athlete sessions
const getAthleteSessions = async (athlete_user_id: number) => {
  try {
    //varaible to handle prisma query
    const athlete_sessions = await prisma.athlete_Session.findMany({
      where: { athlete_user_id },
      include: {
        session: {
          select: {
            level: true,
            length: true,
            session_name: true,
            Session_Drill: {
              select: {
                drill: {
                  select: {
                    drill_type: true,
                    description: true,
                    level: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    //return results
    return athlete_sessions;
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

//helper to get trainers athletes
const getTrainerAthletes = async (trainer_user_id: number) => {
  try {
    //variable to handle prisma query
    const trainer_athletes = await prisma.athlete.findMany({
      where: { trainer_user_id },
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
    return trainer_athletes;
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

//helper to get trainers drills
const getTrainerDrills = async (trainer_user_id: number) => {
  try {
    //variable to handle prisma query
    const trainer_drills = await prisma.drill.findMany({
      where: { trainer_user_id },
      select: {
        drill_id: true,
        drill_type: true,
        description: true,
        level: true,
        drill_name: true,
      },
    });
    //return results
    return trainer_drills;
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

//helper to get trainer sessions
const getTrainerSessions = async (trainer_user_id: number) => {
  try {
    //variable to handle prisma query
    const trainer_sessions = await prisma.session.findMany({
      where: { trainer_user_id },
      select: {
        session_id: true,
        length: true,
        level: true,
        session_name: true,
        trainer_user_id: true,
      },
    });
    //return results
    return trainer_sessions;
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

//helper to get trainer username and password
const getTrainerUsernamePassword = async (trainer_user_id: number) => {
  try {
    //variable to handle prisma query
    const trainer = await prisma.trainer.findUnique({
      where: { trainer_user_id },
      select: {
        username: true,
        hash_password: true,
      },
    });
    //return results
    return trainer;
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

//helper to get athlete username and password
const getAthleteUsernamePassword = async (athlete_user_id: number) => {
  try {
    //variable to handle prisma query
    const athlete = await prisma.athlete.findUnique({
      where: { athlete_user_id },
      select: {
        username: true,
        hash_password: true,
      },
    });
    //return results
    return athlete;
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

export {
  getTrainers,
  getAthletes,
  getDrills,
  getSessions,
  getSessionDrills,
  getTrainer,
  getAthlete,
  getAthleteSessions,
  getTrainerAthletes,
  getTrainerDrills,
  getTrainerUsernamePassword,
  getAthleteUsernamePassword,
  getTrainerSessions,
  getDrillsByType,
};
