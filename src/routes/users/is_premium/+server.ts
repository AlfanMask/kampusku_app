import { mysqlconn } from '$lib/db/mysql.js';
import { json } from '@sveltejs/kit';

// will check if user is premium or not
export async function GET({ url }) {
    const userId = url.searchParams.get("user-id");

    const is_premium: boolean = await mysqlconn.query<any>(`SELECT premium_to FROM users WHERE user_id = '${userId}'`).then(([rows, fields]) => {
        return rows[0].premium_to ? true : false;
    })

    return json(is_premium)
}