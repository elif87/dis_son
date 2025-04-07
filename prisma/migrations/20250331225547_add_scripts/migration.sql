-- CreateTable
CREATE TABLE "Script" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "scriptId" TEXT,
    "customScript" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Script_pkey" PRIMARY KEY ("id")
);
