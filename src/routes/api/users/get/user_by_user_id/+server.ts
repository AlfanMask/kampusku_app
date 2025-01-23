import { mysqlconn } from '$lib/db/mysql.js';
import { json } from '@sveltejs/kit';
import type User from '../../../../../constants/user.js';

// will check if user is premium or not
export async function GET({ url }) {
    const userId = url.searchParams.get("user-id");

    const userData: User = await mysqlconn.query<any>(`SELECT user_id, univ, gender, age, faculty FROM users WHERE user_id = '${userId}'`).then(([rows, fields]) => {
        return rows[0];
    })

    return json(userData)
}