import { Request, Response } from 'express';
import { generateToken, getDataUserFromToken } from "../service/login";
import { getTokenJWT } from '../auth/auth.methods';
import { BadRequest } from '../util/badRequest';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await generateToken(email, password);
        return res.json({
            success: token !== null && token !== undefined,
            token: token
        });

    } catch (error) {
        if (error instanceof BadRequest)
            return res.status(error.statusCode).json({ message: error.message });
        else
            return res.status(500).json({ message: error });
    }
};


export const getDataUser = async (req: Request, res: Response) => {
    try {
        const userData = getDataUserFromToken(getTokenJWT(req));
        return res.json({
            success: userData !== null && userData !== undefined,
            data: userData
        });

    } catch (error) {
        if (error instanceof BadRequest)
            return res.status(error.statusCode).json({ message: error.message });
        else
            return res.status(500).json({ message: error });
    }
};

