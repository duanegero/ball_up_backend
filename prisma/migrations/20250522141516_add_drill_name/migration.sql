/*
  Warnings:

  - Added the required column `drill_name` to the `drills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drills" ADD COLUMN     "drill_name" TEXT NOT NULL;
