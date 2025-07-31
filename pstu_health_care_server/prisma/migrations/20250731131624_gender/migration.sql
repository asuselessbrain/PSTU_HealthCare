-- AlterEnum
ALTER TYPE "Gender" ADD VALUE 'OTHERS';

-- AlterTable
ALTER TABLE "doctors" ALTER COLUMN "appointmentFee" SET DEFAULT 0,
ALTER COLUMN "isDeleted" SET DEFAULT false;
