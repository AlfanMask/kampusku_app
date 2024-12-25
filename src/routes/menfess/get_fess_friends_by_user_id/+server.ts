// put this to prevent error when building
// export const prerender = true

import { mysqlconn } from "$lib/db/mysql";
import { json } from "@sveltejs/kit";
import type { FessFriends } from "../../../constants/tables.js";

export async function GET({ url }) {
    const userId = url.searchParams.get("user-id");
    
    // get last 10 fess data
    let last20FessData: Array<FessFriends> = await mysqlconn.query(`SELECT id, message, link, deleted, pinned_at, is_edited, num_comments, num_reactions, created_at, new_msg, 'fess' AS table_name FROM fess WHERE user_id = '${userId}' AND deleted IS NULL ORDER BY id DESC LIMIT 10`).then(([rows, fields]) => {
        return rows as Array<FessFriends>;
    })

    // get last 10 friends data
    let last20FriendData: Array<FessFriends> = await mysqlconn.query(`SELECT id, message, link, deleted, pinned_at, is_edited, num_comments, num_reactions, created_at, new_msg, 'friends' AS table_name FROM friends WHERE user_id = '${userId}' AND deleted = 0 ORDER BY id DESC LIMIT 10`).then(([rows, fields]) => {
        return rows as Array<FessFriends>;
    })

    // append them and order by created_at, and get only 20 last data
    let result = [...last20FessData, ...last20FriendData].sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })

    return json(result)
}