import { Request, Response } from 'express';
import { addAssistance, getAssistance } from '../service/assistance';
import { getTokenJWT } from '../auth/auth.methods';
import { BadRequest } from '../util/badRequest';

export const addNewAssistance = async (req: Request, res: Response) => {
    try {
        let { promotions, date } = req.body;
        await addAssistance(promotions, getTokenJWT(req), date);
        return res.json({
            success: true
        });

    } catch (error) {
        console.log(error);
        if (error instanceof BadRequest)
            return res.status(error.statusCode).json({ message: error.message });
        else
            return res.status(500).json({ message: error });
    }
};

export const getAssistanceWithDetail = async (req: Request, res: Response) => {
    try {
        let data = await getAssistance(getTokenJWT(req));
        return res.json({
            success: data.length > 0,
            data: data
        });

    } catch (error) {
        console.log(error);
        if (error instanceof BadRequest)
            return res.status(error.statusCode).json({ message: error.message });
        else
            return res.status(500).json({ message: error });
    }
};

