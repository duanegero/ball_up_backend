/*
  Warnings:

  - Changed the type of `drill_type` on the `drills` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DrillType" AS ENUM ('shoot', 'dribble', 'pass', 'reb_defence', 'warmup');

-- AlterTable
ALTER TABLE "drills" DROP COLUMN "drill_type",
ADD COLUMN     "drill_type" "DrillType" NOT NULL;
