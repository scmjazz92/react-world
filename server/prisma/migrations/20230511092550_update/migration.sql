/*
  Warnings:

  - You are about to drop the column `userId` on the `ArticleStats` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArticleStats" DROP CONSTRAINT "ArticleStats_userId_fkey";

-- DropIndex
DROP INDEX "ArticleStats_userId_key";

-- AlterTable
ALTER TABLE "ArticleStats" DROP COLUMN "userId";
