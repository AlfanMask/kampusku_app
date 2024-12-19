import type { UNIVS } from "./universities";

interface MerchantFee {
    id: number;
    name: string;
    addon_fee: number;
    is_parkir_free: boolean;
    univ: UNIVS;
}

interface PopularPlacesFee {
    id: number;
    name: string;
    fee: number;
    univ: UNIVS;
}

export type { MerchantFee, PopularPlacesFee }