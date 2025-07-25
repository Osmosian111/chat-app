-- DropIndex
DROP INDEX "Room_id_key";

-- DropIndex
DROP INDEX "User_id_key";

-- CreateTable
CREATE TABLE "_JoinedRooms" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_JoinedRooms_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_JoinedRooms_B_index" ON "_JoinedRooms"("B");

-- AddForeignKey
ALTER TABLE "_JoinedRooms" ADD CONSTRAINT "_JoinedRooms_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JoinedRooms" ADD CONSTRAINT "_JoinedRooms_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
