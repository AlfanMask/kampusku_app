import { mysqlconn } from '$lib/db/mysql';
import { json } from "@sveltejs/kit";


// check if post is already closed
export async function GET({ url }) {
    const link = url.searchParams.get("link");

    let is_closed: boolean = await mysqlconn.query<any>(`SELECT is_closed FROM magers WHERE link = '${link}'`).then(([rows, field]) => {
        return rows[0].is_closed ? true : false;
    })

    return json(is_closed)
}