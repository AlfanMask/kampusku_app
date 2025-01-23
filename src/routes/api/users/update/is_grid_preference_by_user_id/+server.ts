import { mysqlconn } from '$lib/db/mysql.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const data: {isGrid: string, userId: string} = await request.json();
    console.log("data:",data)
    await mysqlconn.query(`UPDATE users SET is_grid_prev = ${data.isGrid} WHERE user_id = '${data.userId}'`)
    return json({ success: true })
}