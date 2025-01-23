import { mysqlconn } from '$lib/db/mysql';
import { json } from "@sveltejs/kit";


// check if post is pinned by table and post_link
export async function GET({ url }) {
    const link = url.searchParams.get("link");

    let is_pinned: boolean = await mysqlconn.query<any>(`SELECT pinned_at FROM friends WHERE link = '${link}'`).then(([rows, field]) => {
        return rows[0].pinned_at ? true : false;
    })

    return json(is_pinned)
}