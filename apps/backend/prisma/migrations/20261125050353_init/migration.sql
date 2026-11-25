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
CREATE TABLE "Teamsheet" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "bettingTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Teamsheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RacerToTeamsheet" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RacerToTeamsheet_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Racer_name_key" ON "Racer"("name");

-- CreateIndex
CREATE INDEX "_RacerToTeamsheet_B_index" ON "_RacerToTeamsheet"("B");

-- AddForeignKey
ALTER TABLE "_RacerToTeamsheet" ADD CONSTRAINT "_RacerToTeamsheet_A_fkey" FOREIGN KEY ("A") REFERENCES "Racer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RacerToTeamsheet" ADD CONSTRAINT "_RacerToTeamsheet_B_fkey" FOREIGN KEY ("B") REFERENCES "Teamsheet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
