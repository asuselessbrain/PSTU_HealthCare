import { Gender } from "../../../../generated/prisma";

type TAdmin = {
    name: string;
    email: string;
    contactNumber: string;
    profilePhoto: string | undefined
}

export interface IAdmin {
    password: string;
    admin: TAdmin
}

type TDoctor = {
    name: string;
    email: string;
    profilePhoto?: string;
    contactNumber: string;
    address?: string;
    registrationNumber: string;
    experience: number;
    gender: Gender
    appointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    averageRating: number;
}
export interface IDoctor {
    password: string;
    doctor: TDoctor
}
