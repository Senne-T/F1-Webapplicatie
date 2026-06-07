/*
  Warnings:

  - You are about to alter the column `time` on the `Result` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `completed` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fastestLap` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Made the column `time` on table `Result` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Race" ADD COLUMN     "completed" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "fastestLap" VARCHAR(255) NOT NULL,
ALTER COLUMN "time" SET NOT NULL,
ALTER COLUMN "time" SET DATA TYPE VARCHAR(255);
