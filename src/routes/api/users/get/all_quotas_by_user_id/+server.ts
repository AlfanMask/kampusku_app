import { mysqlconn } from '$lib/db/mysql.js';
import { json } from '@sveltejs/kit';
import type Quotas from '../../../../../constants/quotas.js';

// will check if user is premium or not
export async function GET({ url }) {
    const userId = url.searchParams.get("user-id");

    const quotas: Quotas = await mysqlconn.query<any>(`SELECT special_quota, bid_quota FROM users WHERE user_id = '${userId}'`).then(([rows, fields]) => {
        return {
            special_quota: rows[0].special_quota,
            bid_quota: rows[0].bid_quota,
        }
    })

    return json(quotas)
}