export class BadRequest extends Error {
    public statusCode: number;
    
    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.name = 'BadRequest';
        this.statusCode = statusCode;
    }
}
