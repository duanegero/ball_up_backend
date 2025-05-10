-- AlterTable
ALTER TABLE "drills" ADD COLUMN     "trainer_user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "drills" ADD CONSTRAINT "drills_trainer_user_id_fkey" FOREIGN KEY ("trainer_user_id") REFERENCES "trainers"("trainer_user_id") ON DELETE SET NULL ON UPDATE CASCADE;
