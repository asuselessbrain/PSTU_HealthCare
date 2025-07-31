import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import type { StringValue } from 'ms';

export const createToken = async(payload: {email: string, role: string}, secret: Secret, expiresIn: StringValue) => {
    const token =  jwt.sign(payload,secret, {algorithm: "HS256", expiresIn})
    return token
}

export const verify = async(token: string, secret: Secret) => {
    return jwt.verify(token, secret)
}