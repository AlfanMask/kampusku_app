import { mysqlconn } from '$lib/db/mysql.js';
import { json } from '@sveltejs/kit';
import type User from '../../../../../constants/user.js';

// will check if user is premium or not
export async function POST({ request }) {
    const userData: User = await request.json();
    await mysqlconn.query(`UPDATE users SET gender = '${userData.gender}', age = ${userData.age}, faculty = '${userData.faculty}' WHERE user_id = '${userData.user_id}'`)
    return json({ success: true })
}