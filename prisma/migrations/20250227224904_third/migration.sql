/*
  Warnings:

  - A unique constraint covering the columns `[userId,cleaningId]` on the table `User_cleaning` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_cleaning_userId_cleaningId_key" ON "User_cleaning"("userId", "cleaningId");
