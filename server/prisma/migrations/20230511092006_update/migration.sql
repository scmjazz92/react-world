/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ArticleStats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ArticleStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArticleStats" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ArticleStats_userId_key" ON "ArticleStats"("userId");

-- AddForeignKey
ALTER TABLE "ArticleStats" ADD CONSTRAINT "ArticleStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
