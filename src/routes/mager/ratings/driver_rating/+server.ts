// put this to prevent error when building
// export const prerender = true

import { mysqlconn } from "$lib/db/mysql";
import { json } from "@sveltejs/kit";
import { DRIVER_RATING_SERVICES, RATINGS, type DRIVER_RATINGS_POINT } from "../../../../constants/ratings.js";

// get driver rating based on driver username and service selected
export async function GET({ url }) {
    const driverUsn: string = url.searchParams.get("username") as string;
    const service: DRIVER_RATING_SERVICES = url.searchParams.get("service") as DRIVER_RATING_SERVICES;
    
    let ratingResult: DRIVER_RATINGS_POINT = { is_registered: false, point: 0, num_rater: 0 };

    if (service === DRIVER_RATING_SERVICES.ALL_AVG) {
        const res = await mysqlconn
        .query<any>(
            `SELECT ratings.point FROM ratings 
             JOIN drivers ON ratings.target_id = drivers.driver_id 
             WHERE ratings.person_type = '${RATINGS.DRIVER}' 
             AND drivers.username = '${driverUsn}'`
        )
        .then(([rows, fields]) => {
            return rows as Array<{point: number}>;
        });
        const isRegisteredDriver = await mysqlconn
        .query<any>(
            `SELECT COUNT(driver_id) FROM drivers 
            WHERE username = '${driverUsn}'`
        )
        .then(([rows, fields]) => {
            return rows;
        });
    
        // calculate
        ratingResult = {
            is_registered: isRegisteredDriver.length > 0 ? isRegisteredDriver[0]["COUNT(driver_id)"] > 0 : false,
            point: res.length > 0 ? res.reduce((sum, item) => sum + Number(item.point), 0) / res.length : 0,
            num_rater: res.length,
        }
    } else {
        const res = await mysqlconn
            .query<any>(
                `SELECT ratings.point FROM ratings 
                 JOIN drivers ON ratings.target_id = drivers.driver_id 
                 WHERE ratings.person_type = '${RATINGS.DRIVER}' 
                 AND drivers.username = '${driverUsn}' 
                 AND ratings.type = '${service}'`
            )
            .then(([rows, fields]) => {
                return rows as Array<{point: number}>;
            });
        const isRegisteredDriver = await mysqlconn
            .query<any>(
                `SELECT COUNT(driver_id) FROM drivers 
                 WHERE username = '${driverUsn}'`
            )
            .then(([rows, fields]) => {
                return rows;
            });
        
        
        // calculate
        ratingResult = {
            is_registered: isRegisteredDriver.length > 0 ? isRegisteredDriver[0]["COUNT(driver_id)"] > 0 : false,
            point: res.length > 0 ? res.reduce((sum, item) => sum + Number(item.point), 0) / res.length : 0,
            num_rater: res.length,
        }
    }

    return json(ratingResult)
}