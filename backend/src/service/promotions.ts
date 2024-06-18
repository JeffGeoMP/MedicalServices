import { getConnection } from '../databse/connector';
import { Promotions } from '../interface/promotions';

export async function getPromotions(): Promise<Promotions[]> {
    const connection = await getConnection();
    const [rows, fields] = await connection.query('SELECT IdPromotions, Name, Price, Type FROM Promotions');

    let data: Promotions[] = rows as Promotions[];
    connection.release();

    data = data.map((item: Promotions) => {
        return {
            ...item,
            PriceDisplay: 'Q ' + item.Price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        };
    });

    return data;
}