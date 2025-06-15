/*
  Warnings:

  - You are about to drop the column `username` on the `GameResult` table. All the data in the column will be lost.
  - Made the column `classId` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_classId_fkey";

-- AlterTable
ALTER TABLE "GameResult" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "classId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
