import { mysqlconn } from '$lib/db/mysql.js';
import { json } from '@sveltejs/kit';
import type Premiums from '../../../../../constants/premiums.js';

// will check if user is premium or not
export async function GET({ url }) {
    const userId = url.searchParams.get("user-id");

    const premiums: Premiums = await mysqlconn.query<any>(`SELECT premium_menfess_to, premium_anon_to, premium_driver_to FROM users WHERE user_id = '${userId}'`).then(([rows, fields]) => {
        return {
            premium_menfess: rows[0].premium_menfess_to ? formatDate(rows[0].premium_menfess_to) : "-",
            premium_anon: rows[0].premium_anon_to ? formatDate(rows[0].premium_anon_to) : "-",
            premium_driver: rows[0].premium_driver_to ? formatDate(rows[0].premium_driver_to) : "-",
        }
    })

    return json(premiums)
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    const day = String(date.getUTCDate()).padStart(2, '0'); // Get day and pad with leading zero if necessary
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so add 1) and pad with leading zero
    const year = String(date.getUTCFullYear()).slice(-2); // Get last two digits of the year
    const hours = String(date.getUTCHours()).padStart(2, '0'); // Get hours and pad with leading zero
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Get minutes and pad with leading zero
    
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
}