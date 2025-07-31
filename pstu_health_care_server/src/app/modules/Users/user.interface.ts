type TAdmin =  {
    name: string;
    email: string;
    contactNumber: string;
    profilePhoto: string | undefined
}

export interface IAdmin {
    password: string;
    admin: TAdmin
}