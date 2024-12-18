import type { MAGER, MENFESS } from "./post_types";

interface FDMenfess {
    type: MENFESS,
    message: string,
}

interface FDMager {
    type: MAGER,
    message?: string,
    from?: string,
    destination?: string,
}

export type { FDMenfess, FDMager }