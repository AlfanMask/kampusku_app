import { mysqlconn } from '$lib/db/mysql';
import { json } from "@sveltejs/kit";
import { Tables } from '../../../../../constants/tables.js';


// check if there any pinned post is by user_id
export async function GET({ url }) {
    const userId = url.searchParams.get("user-id");
    let isAnyPinned: boolean = false;
    
    isAnyPinned = await mysqlconn.query<any>(`SELECT COUNT(id) FROM magers WHERE pinned_at IS NOT NULL AND user_id = '${userId}'`).then(([rows, field]) => {
        return rows[0]['COUNT(id)'] > 0 ? true : false;
    })

    return json(isAnyPinned)
}