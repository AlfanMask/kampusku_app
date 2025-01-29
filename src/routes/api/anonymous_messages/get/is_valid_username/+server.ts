import { mysqlconn } from '$lib/db/mysql.js';
import { json } from '@sveltejs/kit';

// will check if user is premium or not
export async function GET({ url }) {
    const username = url.searchParams.get("username");

    const isValid:boolean = await mysqlconn.query<any>(`SELECT COUNT(id) FROM users WHERE username = '${username}' AND is_active_receive_anonymous_message = 1`).then(([rows, fields]) => {
        if (rows[0]['COUNT(id)'] > 0) return true
        return false;
    })

    return json(isValid)
}