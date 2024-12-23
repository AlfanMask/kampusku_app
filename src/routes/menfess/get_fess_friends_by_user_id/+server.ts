// put this to prevent error when building
export const prerender = true

import { mysqlconn } from "$lib/db/mysql";
import { json } from "@sveltejs/kit";
import type { FessFriends } from "../../../constants/tables.js";

export async function GET({ url }) {
    const userId = url.searchParams.get("user-id");
    
    // get last 20 fess data
    let last20FessData: Array<FessFriends> = await mysqlconn.query(`SELECT id, message, link, deleted, pinned_at, is_edited, num_comments, num_reactions, created_at, 'fess' AS table_name FROM fess WHERE user_id = '${userId}' AND deleted IS NULL ORDER BY id DESC LIMIT 20`).then(([rows, fields]) => {
        return rows as Array<FessFriends>;
    })

    // get last 20 friends data
    let last20FriendData: Array<FessFriends> = await mysqlconn.query(`SELECT id, message, link, deleted, pinned_at, is_edited, num_comments, num_reactions, created_at, 'friends' AS table_name FROM friends WHERE user_id = '${userId}' AND deleted IS NULL ORDER BY id DESC LIMIT 20`).then(([rows, fields]) => {
        return rows as Array<FessFriends>;
    })

    // append them and order by created_at, and get only 20 last data
    let result = [...last20FessData, ...last20FriendData].sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }).slice(0, 20)

    return json(result)
}