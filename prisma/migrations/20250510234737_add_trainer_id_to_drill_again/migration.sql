/*
  Warnings:

  - Made the column `trainer_user_id` on table `drills` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "drills" DROP CONSTRAINT "drills_trainer_user_id_fkey";

-- AlterTable
ALTER TABLE "drills" ALTER COLUMN "trainer_user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "drills" ADD CONSTRAINT "drills_trainer_user_id_fkey" FOREIGN KEY ("trainer_user_id") REFERENCES "trainers"("trainer_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
