-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('Deposit', 'Withdrawal');

-- CreateTable
CREATE TABLE "Race" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "trackLength" TEXT NOT NULL,
    "trackImg" TEXT NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "favoriteRacer" TEXT,
    "favoriteTrack" TEXT,
    "credits" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "totalProfit" DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teamsheet" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "bettingTotal" DECIMAL(65,30) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Teamsheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Racer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "season_position" TEXT NOT NULL,
    "season_points" INTEGER NOT NULL,
    "grand_prix_races" INTEGER NOT NULL,
    "grand_prix_wins" INTEGER NOT NULL,
    "image" TEXT,

    CONSTRAINT "Racer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RaceToRacer" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_RaceToRacer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_RacerToTeamsheet" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RacerToTeamsheet_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");

-- CreateIndex
CREATE INDEX "Teamsheet_userId_idx" ON "Teamsheet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Racer_name_key" ON "Racer"("name");

-- CreateIndex
CREATE INDEX "_RaceToRacer_B_index" ON "_RaceToRacer"("B");

-- CreateIndex
CREATE INDEX "_RacerToTeamsheet_B_index" ON "_RacerToTeamsheet"("B");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teamsheet" ADD CONSTRAINT "Teamsheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceToRacer" ADD CONSTRAINT "_RaceToRacer_A_fkey" FOREIGN KEY ("A") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceToRacer" ADD CONSTRAINT "_RaceToRacer_B_fkey" FOREIGN KEY ("B") REFERENCES "Racer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RacerToTeamsheet" ADD CONSTRAINT "_RacerToTeamsheet_A_fkey" FOREIGN KEY ("A") REFERENCES "Racer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RacerToTeamsheet" ADD CONSTRAINT "_RacerToTeamsheet_B_fkey" FOREIGN KEY ("B") REFERENCES "Teamsheet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
