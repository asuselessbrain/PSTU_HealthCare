-- CreateEnum
CREATE TYPE "public"."BloodGroup" AS ENUM ('A_POSITIVE', 'B_POSITIVE', 'O_POSITIVE', 'AB_POSITIVE', 'A_NEGATIVE', 'B_NEGATIVE', 'O_NEGATIVE', 'AB_NEGATIVE');

-- CreateEnum
CREATE TYPE "public"."MaritalStatus" AS ENUM ('MARRIED', 'UNMARRIED');

-- CreateTable
CREATE TABLE "public"."PatientHealthData" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "bloodGroup" "public"."BloodGroup" NOT NULL,
    "hasAllergies" BOOLEAN NOT NULL DEFAULT false,
    "hasDiabetes" BOOLEAN NOT NULL DEFAULT false,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "smokingStatus" BOOLEAN NOT NULL DEFAULT false,
    "dietaryPreferences" TEXT NOT NULL,
    "pregnancyStatus" BOOLEAN NOT NULL DEFAULT false,
    "mentalHealthHistory" TEXT NOT NULL,
    "immunizationStatus" TEXT NOT NULL,
    "hasPastSurgeries" BOOLEAN NOT NULL DEFAULT false,
    "recentAnxiety" BOOLEAN NOT NULL DEFAULT false,
    "recentDepression" BOOLEAN NOT NULL DEFAULT false,
    "maritalStatus" "public"."MaritalStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PatientHealthData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MedicalReport" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "reportName" TEXT NOT NULL,
    "reportLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PatientHealthData_patientId_key" ON "public"."PatientHealthData"("patientId");

-- AddForeignKey
ALTER TABLE "public"."PatientHealthData" ADD CONSTRAINT "PatientHealthData_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MedicalReport" ADD CONSTRAINT "MedicalReport_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
