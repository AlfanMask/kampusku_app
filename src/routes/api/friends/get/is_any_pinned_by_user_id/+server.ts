import { mysqlconn } from '$lib/db/mysql';
import { json } from "@sveltejs/kit";
import { Tables } from '../../../../../constants/tables.js';


// check if there any pinned post is by user_id
export async function GET({ url }) {
    const userId = url.searchParams.get("user-id");
    let isAnyPinned: boolean = false;

    // get from fess & friends
    let isAnyPinnedFess: boolean = await mysqlconn.query<any>(`SELECT COUNT(id) FROM fess WHERE pinned_at IS NOT NULL AND user_id = '${userId}'`).then(([rows, field]) => {
        return rows[0]['COUNT(id)'] > 0 ? true : false;
    })
    let isAnyPinnedFriends: boolean = await mysqlconn.query<any>(`SELECT COUNT(id) FROM friends WHERE pinned_at IS NOT NULL AND user_id = '${userId}'`).then(([rows, field]) => {
        return rows[0]['COUNT(id)'] > 0 ? true : false;
    })

    isAnyPinned = isAnyPinnedFess || isAnyPinnedFriends

    return json(isAnyPinned)
}