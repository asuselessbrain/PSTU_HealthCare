import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import type { StringValue } from 'ms';

export const createToken = (payload: {email: string, role: string}, secret: Secret, expiresIn: StringValue) => {
    const token =  jwt.sign(payload,secret, {algorithm: "HS256", expiresIn})
    return token
}