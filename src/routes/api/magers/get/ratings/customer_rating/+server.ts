// put this to prevent error when building
// export const prerender = true

import { mysqlconn } from "$lib/db/mysql";
import { json } from "@sveltejs/kit";
import { DRIVER_RATING_SERVICES, RATINGS, type DRIVER_RATINGS_POINT } from "../../../../../../constants/ratings.js";

// get driver rating based on driver username and service selected
export async function GET({ url }) {
    const custUsn: string = url.searchParams.get("username") as string;
    const service: DRIVER_RATING_SERVICES = url.searchParams.get("service") as DRIVER_RATING_SERVICES;
    
    // TODO: make CUSTOMER_RATINGS_POINT so no need to put is_registered property
    let ratingResult: DRIVER_RATINGS_POINT = { is_registered:true, point: 0, num_rater: 0 };

    if (service === DRIVER_RATING_SERVICES.ALL_AVG) {
        const res = await mysqlconn
        .query<any>(
            `SELECT ratings.point FROM ratings 
             JOIN users ON ratings.target_id = users.user_id 
             WHERE ratings.person_type = '${RATINGS.CUSTOMER}' 
             AND users.username = '${custUsn}'`
        )
        .then(([rows, fields]) => {
            return rows as Array<{point: number}>;
        });
    
        // calculate
        ratingResult = {
            is_registered: true,
            point: res.length > 0 ? res.reduce((sum, item) => sum + Number(item.point), 0) / res.length : 0,
            num_rater: res.length,
        }
    } else {
        const res = await mysqlconn
            .query<any>(
                `SELECT ratings.point FROM ratings 
                 JOIN users ON ratings.target_id = users.user_id 
                 WHERE ratings.person_type = '${RATINGS.CUSTOMER}' 
                 AND users.username = '${custUsn}' 
                 AND ratings.type = '${service}'`
            )
            .then(([rows, fields]) => {
                return rows as Array<{point: number}>;
            });
        
        // calculate
        ratingResult = {
            is_registered: true,
            point: res.length > 0 ? res.reduce((sum, item) => sum + Number(item.point), 0) / res.length : 0,
            num_rater: res.length,
        }
    }

    return json(ratingResult)
}