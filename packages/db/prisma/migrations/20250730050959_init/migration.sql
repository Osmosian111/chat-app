/*
  Warnings:

  - You are about to drop the `_JoinedRooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_JoinedRooms" DROP CONSTRAINT "_JoinedRooms_A_fkey";

-- DropForeignKey
ALTER TABLE "_JoinedRooms" DROP CONSTRAINT "_JoinedRooms_B_fkey";

-- DropIndex
DROP INDEX "Room_slug_key";

-- DropTable
DROP TABLE "_JoinedRooms";

-- CreateTable
CREATE TABLE "UserRoom" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRoom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRoom_userId_roomId_key" ON "UserRoom"("userId", "roomId");

-- AddForeignKey
ALTER TABLE "UserRoom" ADD CONSTRAINT "UserRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoom" ADD CONSTRAINT "UserRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
