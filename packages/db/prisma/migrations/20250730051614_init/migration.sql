/*
  Warnings:

  - You are about to drop the `UserRoom` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserRoom" DROP CONSTRAINT "UserRoom_roomId_fkey";

-- DropForeignKey
ALTER TABLE "UserRoom" DROP CONSTRAINT "UserRoom_userId_fkey";

-- DropTable
DROP TABLE "UserRoom";

-- CreateTable
CREATE TABLE "_JoinedRooms" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_JoinedRooms_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_JoinedRooms_B_index" ON "_JoinedRooms"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Room_slug_key" ON "Room"("slug");

-- AddForeignKey
ALTER TABLE "_JoinedRooms" ADD CONSTRAINT "_JoinedRooms_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JoinedRooms" ADD CONSTRAINT "_JoinedRooms_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
