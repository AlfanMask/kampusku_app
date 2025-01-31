import { mysqlconn } from '$lib/db/mysql.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    const userId = url.searchParams.get("user-id");

    const is_driver: boolean = await mysqlconn.query<any>(`SELECT id FROM drivers WHERE driver_id = '${userId}'`).then(([rows, fields]) => {
        return rows[0].id ? true : false;
    })

    return json(is_driver)
}