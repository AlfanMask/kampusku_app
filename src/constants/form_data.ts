import type { DataType } from "./data_types";
import type { MAGER, MENFESS } from "./post_types";
import type { Tables } from "./tables";

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

interface FDGetLink {
    type: DataType,
    link: string,
}

interface FDPin {
    type: DataType,
    link: string,
    table: Tables,
}

interface FDEdit {
    type: DataType,
    new_msg: string,
    link: string,
    table: Tables,
}

interface FDDelete {
    type: DataType,
    link: string,
    table: Tables,
}

interface FDClose {
    type: DataType,
    link: string,
}

interface FDCancel {
    type: DataType,
    link: string,
    cancel_explanation: string,
}

interface FDDelvote {
    type: DataType,
    link: string,
}

interface FDSendAnonMsg {
    type: DataType,
    username: string,
    message: string,
}

export type { FDMenfess, FDMager, FDGetLink, FDPin, FDEdit, FDDelete, FDClose, FDCancel, FDDelvote, FDSendAnonMsg }