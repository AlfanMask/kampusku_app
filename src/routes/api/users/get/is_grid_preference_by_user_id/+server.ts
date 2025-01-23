import { mysqlconn } from '$lib/db/mysql.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    const userId = url.searchParams.get("user-id");

    const is_grid_prev: boolean = await mysqlconn.query<any>(`SELECT is_grid_prev FROM users WHERE user_id = '${userId}'`).then(([rows, fields]) => {
        return rows[0].is_grid_prev == 1 ? true : false;
    })

    return json(is_grid_prev)
}