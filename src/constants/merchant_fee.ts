import type { UNIVS } from "./universities";

export default interface MerchantFee {
    id: number;
    name: string;
    addon_fee: number;
    is_parkir_free: boolean;
    univ: UNIVS;
}