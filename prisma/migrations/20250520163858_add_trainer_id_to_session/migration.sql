/*
  Warnings:

  - Added the required column `trainer_user_id` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "trainer_user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_trainer_user_id_fkey" FOREIGN KEY ("trainer_user_id") REFERENCES "trainers"("trainer_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
