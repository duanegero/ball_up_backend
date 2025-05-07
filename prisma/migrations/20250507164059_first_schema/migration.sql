-- CreateTable
CREATE TABLE "trainers" (
    "trainer_user_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hash_password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "years_experience" INTEGER,
    "bio" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trainers_pkey" PRIMARY KEY ("trainer_user_id")
);

-- CreateTable
CREATE TABLE "athletes" (
    "athlete_user_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hash_password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trainer_id" INTEGER,
    "half_hour_session_id" INTEGER,
    "hour_session_id" INTEGER,

    CONSTRAINT "athletes_pkey" PRIMARY KEY ("athlete_user_id")
);

-- CreateTable
CREATE TABLE "warmup_drills" (
    "warmup_id" INTEGER NOT NULL,
    "trainer_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "warmup_drills_pkey" PRIMARY KEY ("warmup_id")
);

-- CreateTable
CREATE TABLE "dribbling_drills" (
    "dribble_id" INTEGER NOT NULL,
    "trainer_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dribbling_drills_pkey" PRIMARY KEY ("dribble_id")
);

-- CreateTable
CREATE TABLE "shooting_drills" (
    "shoot_id" INTEGER NOT NULL,
    "trainer_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shooting_drills_pkey" PRIMARY KEY ("shoot_id")
);

-- CreateTable
CREATE TABLE "rebounding_defense_drills" (
    "rebound_defence_id" INTEGER NOT NULL,
    "trainer_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rebounding_defense_drills_pkey" PRIMARY KEY ("rebound_defence_id")
);

-- CreateTable
CREATE TABLE "half_hour_sessions" (
    "half_hour_session_id" INTEGER NOT NULL,
    "warmup_id" INTEGER NOT NULL,
    "dribble_id" INTEGER NOT NULL,
    "shoot_id" INTEGER NOT NULL,
    "rebound_defence_id" INTEGER NOT NULL,

    CONSTRAINT "half_hour_sessions_pkey" PRIMARY KEY ("half_hour_session_id")
);

-- CreateTable
CREATE TABLE "hour_sessions" (
    "hour_session_id" INTEGER NOT NULL,
    "warmup_id" INTEGER NOT NULL,
    "dribble_id_one" INTEGER NOT NULL,
    "dribble_id_two" INTEGER NOT NULL,
    "shoot_id_one" INTEGER NOT NULL,
    "shoot_id_two" INTEGER NOT NULL,
    "shoot_id_three" INTEGER NOT NULL,
    "rebound_defence_id_one" INTEGER NOT NULL,
    "rebound_defence_id_two" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hour_sessions_pkey" PRIMARY KEY ("hour_session_id")
);

-- CreateTable
CREATE TABLE "completed_sessions" (
    "completed_session_id" INTEGER NOT NULL,
    "half_hour_session_id" INTEGER,
    "hour_session_id" INTEGER,
    "athlete_id" INTEGER NOT NULL,
    "trainer_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "completed_sessions_pkey" PRIMARY KEY ("completed_session_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trainers_email_key" ON "trainers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "trainers_username_key" ON "trainers"("username");

-- CreateIndex
CREATE UNIQUE INDEX "athletes_email_key" ON "athletes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "athletes_username_key" ON "athletes"("username");

-- AddForeignKey
ALTER TABLE "athletes" ADD CONSTRAINT "athletes_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "trainers"("trainer_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warmup_drills" ADD CONSTRAINT "warmup_drills_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "trainers"("trainer_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dribbling_drills" ADD CONSTRAINT "dribbling_drills_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "trainers"("trainer_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shooting_drills" ADD CONSTRAINT "shooting_drills_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "trainers"("trainer_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rebounding_defense_drills" ADD CONSTRAINT "rebounding_defense_drills_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "trainers"("trainer_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "half_hour_sessions" ADD CONSTRAINT "half_hour_sessions_warmup_id_fkey" FOREIGN KEY ("warmup_id") REFERENCES "warmup_drills"("warmup_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "half_hour_sessions" ADD CONSTRAINT "half_hour_sessions_dribble_id_fkey" FOREIGN KEY ("dribble_id") REFERENCES "dribbling_drills"("dribble_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "half_hour_sessions" ADD CONSTRAINT "half_hour_sessions_shoot_id_fkey" FOREIGN KEY ("shoot_id") REFERENCES "shooting_drills"("shoot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "half_hour_sessions" ADD CONSTRAINT "half_hour_sessions_rebound_defence_id_fkey" FOREIGN KEY ("rebound_defence_id") REFERENCES "rebounding_defense_drills"("rebound_defence_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hour_sessions" ADD CONSTRAINT "hour_sessions_warmup_id_fkey" FOREIGN KEY ("warmup_id") REFERENCES "warmup_drills"("warmup_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hour_sessions" ADD CONSTRAINT "hour_sessions_dribble_id_one_fkey" FOREIGN KEY ("dribble_id_one") REFERENCES "dribbling_drills"("dribble_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hour_sessions" ADD CONSTRAINT "hour_sessions_dribble_id_two_fkey" FOREIGN KEY ("dribble_id_two") REFERENCES "dribbling_drills"("dribble_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hour_sessions" ADD CONSTRAINT "hour_sessions_shoot_id_one_fkey" FOREIGN KEY ("shoot_id_one") REFERENCES "shooting_drills"("shoot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hour_sessions" ADD CONSTRAINT "hour_sessions_shoot_id_two_fkey" FOREIGN KEY ("shoot_id_two") REFERENCES "shooting_drills"("shoot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hour_sessions" ADD CONSTRAINT "hour_sessions_shoot_id_three_fkey" FOREIGN KEY ("shoot_id_three") REFERENCES "shooting_drills"("shoot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hour_sessions" ADD CONSTRAINT "hour_sessions_rebound_defence_id_one_fkey" FOREIGN KEY ("rebound_defence_id_one") REFERENCES "rebounding_defense_drills"("rebound_defence_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hour_sessions" ADD CONSTRAINT "hour_sessions_rebound_defence_id_two_fkey" FOREIGN KEY ("rebound_defence_id_two") REFERENCES "rebounding_defense_drills"("rebound_defence_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completed_sessions" ADD CONSTRAINT "completed_sessions_half_hour_session_id_fkey" FOREIGN KEY ("half_hour_session_id") REFERENCES "half_hour_sessions"("half_hour_session_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completed_sessions" ADD CONSTRAINT "completed_sessions_hour_session_id_fkey" FOREIGN KEY ("hour_session_id") REFERENCES "hour_sessions"("hour_session_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completed_sessions" ADD CONSTRAINT "completed_sessions_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "athletes"("athlete_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completed_sessions" ADD CONSTRAINT "completed_sessions_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "trainers"("trainer_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
