/*
  Warnings:

  - You are about to drop the column `half_hour_session_id` on the `athletes` table. All the data in the column will be lost.
  - You are about to drop the column `hour_session_id` on the `athletes` table. All the data in the column will be lost.
  - You are about to drop the `completed_sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dribbling_drills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `half_hour_sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hour_sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rebounding_defense_drills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shooting_drills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `warmup_drills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "completed_sessions" DROP CONSTRAINT "completed_sessions_athlete_id_fkey";

-- DropForeignKey
ALTER TABLE "completed_sessions" DROP CONSTRAINT "completed_sessions_half_hour_session_id_fkey";

-- DropForeignKey
ALTER TABLE "completed_sessions" DROP CONSTRAINT "completed_sessions_hour_session_id_fkey";

-- DropForeignKey
ALTER TABLE "completed_sessions" DROP CONSTRAINT "completed_sessions_trainer_id_fkey";

-- DropForeignKey
ALTER TABLE "dribbling_drills" DROP CONSTRAINT "dribbling_drills_trainer_id_fkey";

-- DropForeignKey
ALTER TABLE "half_hour_sessions" DROP CONSTRAINT "half_hour_sessions_dribble_id_fkey";

-- DropForeignKey
ALTER TABLE "half_hour_sessions" DROP CONSTRAINT "half_hour_sessions_rebound_defence_id_fkey";

-- DropForeignKey
ALTER TABLE "half_hour_sessions" DROP CONSTRAINT "half_hour_sessions_shoot_id_fkey";

-- DropForeignKey
ALTER TABLE "half_hour_sessions" DROP CONSTRAINT "half_hour_sessions_warmup_id_fkey";

-- DropForeignKey
ALTER TABLE "hour_sessions" DROP CONSTRAINT "hour_sessions_dribble_id_one_fkey";

-- DropForeignKey
ALTER TABLE "hour_sessions" DROP CONSTRAINT "hour_sessions_dribble_id_two_fkey";

-- DropForeignKey
ALTER TABLE "hour_sessions" DROP CONSTRAINT "hour_sessions_rebound_defence_id_one_fkey";

-- DropForeignKey
ALTER TABLE "hour_sessions" DROP CONSTRAINT "hour_sessions_rebound_defence_id_two_fkey";

-- DropForeignKey
ALTER TABLE "hour_sessions" DROP CONSTRAINT "hour_sessions_shoot_id_one_fkey";

-- DropForeignKey
ALTER TABLE "hour_sessions" DROP CONSTRAINT "hour_sessions_shoot_id_three_fkey";

-- DropForeignKey
ALTER TABLE "hour_sessions" DROP CONSTRAINT "hour_sessions_shoot_id_two_fkey";

-- DropForeignKey
ALTER TABLE "hour_sessions" DROP CONSTRAINT "hour_sessions_warmup_id_fkey";

-- DropForeignKey
ALTER TABLE "rebounding_defense_drills" DROP CONSTRAINT "rebounding_defense_drills_trainer_id_fkey";

-- DropForeignKey
ALTER TABLE "shooting_drills" DROP CONSTRAINT "shooting_drills_trainer_id_fkey";

-- DropForeignKey
ALTER TABLE "warmup_drills" DROP CONSTRAINT "warmup_drills_trainer_id_fkey";

-- AlterTable
ALTER TABLE "athletes" DROP COLUMN "half_hour_session_id",
DROP COLUMN "hour_session_id";

-- DropTable
DROP TABLE "completed_sessions";

-- DropTable
DROP TABLE "dribbling_drills";

-- DropTable
DROP TABLE "half_hour_sessions";

-- DropTable
DROP TABLE "hour_sessions";

-- DropTable
DROP TABLE "rebounding_defense_drills";

-- DropTable
DROP TABLE "shooting_drills";

-- DropTable
DROP TABLE "warmup_drills";

-- CreateTable
CREATE TABLE "drills" (
    "drill_id" SERIAL NOT NULL,
    "drill_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "drills_pkey" PRIMARY KEY ("drill_id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "session_id" SERIAL NOT NULL,
    "length" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "athlete_sessions" (
    "athlete_user_id" INTEGER NOT NULL,
    "session_id" INTEGER NOT NULL,

    CONSTRAINT "athlete_sessions_pkey" PRIMARY KEY ("athlete_user_id","session_id")
);

-- CreateTable
CREATE TABLE "session_drills" (
    "session_id" INTEGER NOT NULL,
    "drill_id" INTEGER NOT NULL,

    CONSTRAINT "session_drills_pkey" PRIMARY KEY ("session_id","drill_id")
);

-- AddForeignKey
ALTER TABLE "athlete_sessions" ADD CONSTRAINT "athlete_sessions_athlete_user_id_fkey" FOREIGN KEY ("athlete_user_id") REFERENCES "athletes"("athlete_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "athlete_sessions" ADD CONSTRAINT "athlete_sessions_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_drills" ADD CONSTRAINT "session_drills_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_drills" ADD CONSTRAINT "session_drills_drill_id_fkey" FOREIGN KEY ("drill_id") REFERENCES "drills"("drill_id") ON DELETE RESTRICT ON UPDATE CASCADE;
