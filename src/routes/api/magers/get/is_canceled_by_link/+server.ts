import { mysqlconn } from '$lib/db/mysql';
import { json } from "@sveltejs/kit";


// check if post is already canceled
export async function GET({ url }) {
    const link = url.searchParams.get("link");

    let is_canceled: boolean = await mysqlconn.query<any>(`SELECT is_canceled FROM magers WHERE link = '${link}'`).then(([rows, field]) => {
        return rows[0].is_canceled ? true : false;
    })

    return json(is_canceled)
}