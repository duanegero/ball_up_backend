/*
  Warnings:

  - Added the required column `session_name` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "session_name" TEXT NOT NULL;
