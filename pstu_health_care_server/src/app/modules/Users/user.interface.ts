import { Admin, Doctor, Patient } from "../../../../generated/prisma";

export interface IAdmin {
    password: string;
    admin: Admin
}

export interface IDoctor {
    password: string;
    doctor: Doctor
}

export interface IPatient {
    password: string;
    doctor: Patient
}
