import jwt from 'jsonwebtoken';
import { User } from '../interface/user';

const secretKey = 'DISAGROTEST';

export function generateTokenJWT(data: User): string {   
    const token = jwt.sign(data , secretKey, { expiresIn: '8h' });
    return token;
}

export function verifyTokenJWT(token: string): User | jwt.JwtPayload {
    try {
        const payload = jwt.verify(token, secretKey) as jwt.JwtPayload;
        return payload;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export function getTokenJWT(req: any): string {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    return token;
}