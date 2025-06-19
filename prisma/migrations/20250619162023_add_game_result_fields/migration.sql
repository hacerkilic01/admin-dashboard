/*
  Warnings:

  - You are about to drop the column `correct` on the `GameResult` table. All the data in the column will be lost.
  - You are about to drop the column `durationSec` on the `GameResult` table. All the data in the column will be lost.
  - You are about to drop the column `incorrect` on the `GameResult` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `GameResult` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionId]` on the table `GameResult` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameVersion` to the `GameResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overallAccuracy` to the `GameResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerName` to the `GameResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sceneDataList` to the `GameResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionCompleted` to the `GameResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionEndTime` to the `GameResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `GameResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionStartTime` to the `GameResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCorrectAnswers` to the `GameResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalGameTime` to the `GameResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalScore` to the `GameResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalWrongAnswers` to the `GameResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameResult" DROP COLUMN "correct",
DROP COLUMN "durationSec",
DROP COLUMN "incorrect",
DROP COLUMN "score",
ADD COLUMN     "gameVersion" TEXT NOT NULL,
ADD COLUMN     "overallAccuracy" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "playerName" TEXT NOT NULL,
ADD COLUMN     "sceneDataList" JSONB NOT NULL,
ADD COLUMN     "sessionCompleted" BOOLEAN NOT NULL,
ADD COLUMN     "sessionEndTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sessionId" TEXT NOT NULL,
ADD COLUMN     "sessionStartTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalCorrectAnswers" INTEGER NOT NULL,
ADD COLUMN     "totalGameTime" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalScore" INTEGER NOT NULL,
ADD COLUMN     "totalWrongAnswers" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GameResult_sessionId_key" ON "GameResult"("sessionId");
