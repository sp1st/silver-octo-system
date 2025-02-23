/*
  Warnings:

  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Cleaning" DROP CONSTRAINT "Cleaning_roomId_fkey";

-- AlterTable
ALTER TABLE "Cleaning" ALTER COLUMN "roomId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey",
ALTER COLUMN "roomId" DROP DEFAULT,
ALTER COLUMN "roomId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("roomId");
DROP SEQUENCE "Room_roomId_seq";

-- AddForeignKey
ALTER TABLE "Cleaning" ADD CONSTRAINT "Cleaning_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
