/*
  Warnings:

  - You are about to drop the column `trainer_id` on the `athletes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "athletes" DROP CONSTRAINT "athletes_trainer_id_fkey";

-- AlterTable
ALTER TABLE "athletes" DROP COLUMN "trainer_id",
ADD COLUMN     "trainer_user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "athletes" ADD CONSTRAINT "athletes_trainer_user_id_fkey" FOREIGN KEY ("trainer_user_id") REFERENCES "trainers"("trainer_user_id") ON DELETE SET NULL ON UPDATE CASCADE;
