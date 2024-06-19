import { verifyTokenJWT } from '../auth/auth.methods';
import { getConnection } from '../databse/connector';
import { Assistance } from '../interface/assistance';
import { Promotions } from '../interface/promotions';
import { PromotionsDetail } from '../interface/promotionsDetail';

export async function addAssistance(promotions: Promotions[], token: string, date: Date) {
    const connection = await getConnection();
    const dataUser = verifyTokenJWT(token);

    const [rows, fields] = await connection.query('SELECT IdPromotions, Name, Price, Type FROM Promotions WHERE IdPromotions IN (?)', [promotions]);
    let dataPromotions : Promotions[] = rows as Promotions[];

    const newAssistance : number  = await addAssistanceDB(dataPromotions, dataUser.IdUser, date, connection);   
    await addAssistanceDetailDB(newAssistance, dataPromotions, connection);

    connection.release();
}

export async function getAssistance(token: string) : Promise<Assistance[]> {
    const connection = await getConnection();
    const dataUser = verifyTokenJWT(token);

    const [rows, fields] = await connection.query('SELECT IdAssistance, Date, Total, DiscountServices, DiscountProducts, TotalDiscount FROM Assistance WHERE IdUser = ?', [dataUser.IdUser]);
    let dataAssistance : Assistance[] = rows as Assistance[];
    
    dataAssistance = dataAssistance.map(item => {
        return {
            ...item,
            TotalDisplay: 'Q ' + item.Total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
            TotalDiscountDisplay: 'Q ' + item.TotalDiscount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        };
    });

    for(const assistance of dataAssistance) {
        const [rows, fields] = await connection.query('SELECT ad.IdPromotions, p.Name, ad.Total, p.Type FROM AssistanceDetail ad INNER JOIN Promotions p ON ad.IdPromotions = p.IdPromotions WHERE ad.IdAssistance = ?;', [assistance.IdAssistance]);
        let data : PromotionsDetail[] = rows as PromotionsDetail[];
        data = data.map(item => {
            return {
                ...item,
                TotalDisplay: 'Q ' + item.Total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
            };
        });
        assistance.PromotionsDetail = data;
    }

    connection.release();
    return dataAssistance;

}

async function addAssistanceDetailDB(idAssistance: number, promotions: Promotions[], db : any) {
    for(const promotion of promotions) {
        let query = 'INSERT INTO AssistanceDetail (IdAssistance, IdPromotions, Total) VALUES (?, ?, ?)';
        await db.query(query, [idAssistance, promotion.IdPromotions, promotion.Price]);
    }
}

async function addAssistanceDB(promotions: Promotions[], idUser: number, date: Date, db : any): Promise<number> {
    let total = promotions.reduce((total, promotion) => total + promotion.Price, 0);
    let discountServices = getPercentDiscuount(promotions, 'S') 
    let discountProducts = getPercentDiscuount(promotions, 'P') ;

    let totalDiscountServices = getTotalByType(promotions, 'S') * (discountServices / 100);
    let totalDiscountProducts = getTotalByType(promotions, 'P') * (discountProducts / 100);

    let totalDiscount = (totalDiscountServices + totalDiscountProducts).toFixed(2);

    let query = 'INSERT INTO Assistance (IdUser, Date, Total, DiscountServices, DiscountProducts, TotalDiscount) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] : [any] = await db.query(query, [idUser, date, total, discountServices, discountProducts, totalDiscount]);

    return result.insertId;
}

function getPercentDiscuount(promotions: Promotions[], type:string): number {
    let promotion = promotions.filter(promotion => promotion.Type === type); 
    let total = promotion.reduce((total, promotion) => total + promotion.Price, 0);

    if(promotion.length >= 2 && total >= 1500)
        return 5;
    if(promotion.length >= 2 )
        return 3;

    return 0;
}

function getTotalByType (promotions : Promotions[], type : string) : number {
    let filterType = promotions.filter(promotion => promotion.Type === type);
    let total = filterType.reduce((total, promotion) => total + promotion.Price, 0);
    return total;
}
