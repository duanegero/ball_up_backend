-- AlterTable
CREATE SEQUENCE athletes_athlete_user_id_seq;
ALTER TABLE "athletes" ALTER COLUMN "athlete_user_id" SET DEFAULT nextval('athletes_athlete_user_id_seq');
ALTER SEQUENCE athletes_athlete_user_id_seq OWNED BY "athletes"."athlete_user_id";

-- AlterTable
CREATE SEQUENCE completed_sessions_completed_session_id_seq;
ALTER TABLE "completed_sessions" ALTER COLUMN "completed_session_id" SET DEFAULT nextval('completed_sessions_completed_session_id_seq');
ALTER SEQUENCE completed_sessions_completed_session_id_seq OWNED BY "completed_sessions"."completed_session_id";

-- AlterTable
CREATE SEQUENCE dribbling_drills_dribble_id_seq;
ALTER TABLE "dribbling_drills" ALTER COLUMN "dribble_id" SET DEFAULT nextval('dribbling_drills_dribble_id_seq');
ALTER SEQUENCE dribbling_drills_dribble_id_seq OWNED BY "dribbling_drills"."dribble_id";

-- AlterTable
CREATE SEQUENCE half_hour_sessions_half_hour_session_id_seq;
ALTER TABLE "half_hour_sessions" ALTER COLUMN "half_hour_session_id" SET DEFAULT nextval('half_hour_sessions_half_hour_session_id_seq');
ALTER SEQUENCE half_hour_sessions_half_hour_session_id_seq OWNED BY "half_hour_sessions"."half_hour_session_id";

-- AlterTable
CREATE SEQUENCE hour_sessions_hour_session_id_seq;
ALTER TABLE "hour_sessions" ALTER COLUMN "hour_session_id" SET DEFAULT nextval('hour_sessions_hour_session_id_seq');
ALTER SEQUENCE hour_sessions_hour_session_id_seq OWNED BY "hour_sessions"."hour_session_id";

-- AlterTable
CREATE SEQUENCE rebounding_defense_drills_rebound_defence_id_seq;
ALTER TABLE "rebounding_defense_drills" ALTER COLUMN "rebound_defence_id" SET DEFAULT nextval('rebounding_defense_drills_rebound_defence_id_seq');
ALTER SEQUENCE rebounding_defense_drills_rebound_defence_id_seq OWNED BY "rebounding_defense_drills"."rebound_defence_id";

-- AlterTable
CREATE SEQUENCE shooting_drills_shoot_id_seq;
ALTER TABLE "shooting_drills" ALTER COLUMN "shoot_id" SET DEFAULT nextval('shooting_drills_shoot_id_seq');
ALTER SEQUENCE shooting_drills_shoot_id_seq OWNED BY "shooting_drills"."shoot_id";

-- AlterTable
CREATE SEQUENCE trainers_trainer_user_id_seq;
ALTER TABLE "trainers" ALTER COLUMN "trainer_user_id" SET DEFAULT nextval('trainers_trainer_user_id_seq');
ALTER SEQUENCE trainers_trainer_user_id_seq OWNED BY "trainers"."trainer_user_id";

-- AlterTable
CREATE SEQUENCE warmup_drills_warmup_id_seq;
ALTER TABLE "warmup_drills" ALTER COLUMN "warmup_id" SET DEFAULT nextval('warmup_drills_warmup_id_seq');
ALTER SEQUENCE warmup_drills_warmup_id_seq OWNED BY "warmup_drills"."warmup_id";
