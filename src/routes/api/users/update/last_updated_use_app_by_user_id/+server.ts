import { mysqlconn } from '$lib/db/mysql.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const { userId } = await request.json();
    await mysqlconn.query(`UPDATE users SET last_updated_use_app = NOW() WHERE user_id = '${userId}'`)
    return json({ success: true })
}