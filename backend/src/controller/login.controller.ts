import { Request, Response } from 'express';
import { generateToken } from "../service/login";
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
