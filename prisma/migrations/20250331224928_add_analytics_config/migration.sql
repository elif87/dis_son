/*
  Warnings:

  - You are about to drop the `scripts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "scripts";

-- CreateTable
CREATE TABLE "AnalyticsConfig" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "googleAnalyticsId" TEXT,
    "googleTagManagerId" TEXT,
    "metaPixelId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnalyticsConfig_pkey" PRIMARY KEY ("id")
);
