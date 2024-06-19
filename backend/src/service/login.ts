import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { getConnection } from '../databse/connector';
import { User } from '../interface/user';
import { BadRequest } from '../util/badRequest';
import { generateTokenJWT, verifyTokenJWT } from '../auth/auth.methods';

const secretKey = 'DISAGROTEST';

export async function generateToken(email: string, password: string): Promise<string> {
    const connection = await getConnection();
    const encrypted = CryptoJS.AES.encrypt(password, secretKey).toString();
    const [rows, fields] = await connection.query('SELECT IdUser, Email, Name, LastName FROM User WHERE Email = ? AND Password = ?', [email, password]);

    let data: User[] = rows as User[];
    
    if (data.length === 0 ) 
        throw new BadRequest('Invalid credentials');
    
    connection.release();

    const token = generateTokenJWT(data[0]);
    return token;
}

export function getDataUserFromToken(token: string): User {
    let data: User = verifyTokenJWT(token) as User;
    return data;
}