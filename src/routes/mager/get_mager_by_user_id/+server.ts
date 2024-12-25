// put this to prevent error when building
export const prerender = true

import { mysqlconn } from "$lib/db/mysql";
import { json } from "@sveltejs/kit";
import type { Mager } from "../../../constants/tables.js";

export async function GET({ url }) {
    const userId = url.searchParams.get("user-id");

    // get last 20 data
    let result: Array<Mager> = await mysqlconn.query(`SELECT id, message, link, deleted, pinned_at, is_edited, num_comments, num_reactions, created_at, new_msg, 'magers' AS table_name, is_closed, is_canceled FROM magers WHERE user_id = '${userId}' AND deleted = 0 ORDER BY id DESC LIMIT 20`).then(([rows, fields]) => {
        return rows as Array<Mager>;
    })

    return json(result)
}