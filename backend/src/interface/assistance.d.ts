export interface Assistance {
    IdAssistance: number;
    Date: Date;
    Total: float;
    TotalDisplay: string;
    DiscountServices: number;
    DiscountProducts: number;
    TotalDiscount: number;
    TotalDiscountDisplay: string;
    PromotionsDetail: PromotionsDetail[];
}