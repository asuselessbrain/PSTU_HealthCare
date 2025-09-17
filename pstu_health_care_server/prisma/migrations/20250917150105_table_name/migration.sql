/*
  Warnings:

  - You are about to drop the `MedicalReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatientHealthData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."MedicalReport" DROP CONSTRAINT "MedicalReport_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PatientHealthData" DROP CONSTRAINT "PatientHealthData_patientId_fkey";

-- DropTable
DROP TABLE "public"."MedicalReport";

-- DropTable
DROP TABLE "public"."PatientHealthData";

-- CreateTable
CREATE TABLE "public"."patient_health_data" (
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

    CONSTRAINT "patient_health_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."medical_report" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "reportName" TEXT NOT NULL,
    "reportLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medical_report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patient_health_data_patientId_key" ON "public"."patient_health_data"("patientId");

-- AddForeignKey
ALTER TABLE "public"."patient_health_data" ADD CONSTRAINT "patient_health_data_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."medical_report" ADD CONSTRAINT "medical_report_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
