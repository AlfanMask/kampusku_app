import { mysqlconn } from '$lib/db/mysql.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    const userId = url.searchParams.get("user-id");

    const is_driver: boolean = await mysqlconn.query<any>(`SELECT COUNT(id) FROM drivers WHERE driver_id = '${userId}'`).then(([rows, fields]) => {
        if (rows[0]['COUNT(id)'] > 0) return true
        return false;
    })

    return json(is_driver)
}