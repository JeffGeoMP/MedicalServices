import { Request, Response } from "express";
import { verifyTokenJWT } from "./auth.methods";

export function authenticateToken(req: Request, res: Response, next: () => void) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    try {
        verifyTokenJWT(token);
        next();
    } catch (error) {
        return res.sendStatus(403);
    }
}