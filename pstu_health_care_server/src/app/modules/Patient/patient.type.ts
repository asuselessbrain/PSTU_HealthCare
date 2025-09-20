import { BloodGroup, Gender, MaritalStatus } from "../../../../generated/prisma";

interface IMedicalReport {
    reportName: string;
    reportLink: string;
}

interface IHealthData {
    dateOfBirth: string;
    gender: Gender;
    bloodGroup: BloodGroup;
    hasAllergies: boolean;
    hasDiabetes: boolean;
    height: string;
    weight: string;
    smokingStatus: boolean;
    dietaryPreferences: string;
    pregnancyStatus: boolean;
    mentalHealthHistory: string;
    immunizationStatus: string;
    hasPastSurgeries: boolean;
    recentAnxiety: boolean;
    recentDepression: boolean;
    maritalStatus: MaritalStatus;

}

export interface IPatient {
    name?: string;
    contactNumber?: string;
    address?: string;
    healthData?: IHealthData;
    medicalReport?: IMedicalReport;
}