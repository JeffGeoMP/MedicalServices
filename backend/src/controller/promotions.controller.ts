import { Request, Response } from 'express';
import { getPromotions } from '../service/promotions';
import { BadRequest } from '../util/badRequest';

export const getAllPromotions = async (req: Request, res: Response) => {
    try {
        const data = await getPromotions();
        return res.json({
            success: data.length > 0,
            data: data
        });

    } catch (error) {
        if (error instanceof BadRequest)
            return res.status(error.statusCode).json({ message: error.message });
        else
            return res.status(500).json({ message: error });
    }
};


