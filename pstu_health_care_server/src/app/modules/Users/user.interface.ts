import { Admin, Doctor, Gender } from "../../../../generated/prisma";

export interface IAdmin {
    password: string;
    admin: Admin
}

export interface IDoctor {
    password: string;
    doctor: Doctor
}
