import { mysqlconn } from '$lib/db/mysql';
import { json } from "@sveltejs/kit";


// check if post is already edited before by table and post_link
export async function GET({ url }) {
    const link = url.searchParams.get("link");

    let is_edited: boolean = await mysqlconn.query<any>(`SELECT is_edited FROM friends WHERE link = '${link}'`).then(([rows, field]) => {
        return rows[0].is_edited ? true : false;
    })

    return json(is_edited)
}