-- CreateTable
CREATE TABLE "Race" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "trackLength" TEXT NOT NULL,
    "trackImg" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "drivers" TEXT[],

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);
