/*
  Warnings:

  - A unique constraint covering the columns `[athlete_user_id,session_id]` on the table `athlete_sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "athlete_sessions_athlete_user_id_session_id_key" ON "athlete_sessions"("athlete_user_id", "session_id");
