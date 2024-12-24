import type { UNIVS } from "./universities";

export default interface User {
    user_id: string,
    univ: UNIVS,
    gender: GENDER,
    age: number,
    faculty: FacultiesUNS|FacultiesUMS,
}

enum GENDER {
    "MALE" = "male",
    "FEMALE" = "female",
}

// faculties
enum FacultiesUNS {
    "🍃 FP" = "🍃 FP",
    "🐄 FAPET" = "🐄 FAPET",
    "🛕 FIB"="🛕 FIB",
    "⚖️ FH"="⚖️ FH",
    "📈 FEB"="📈 FEB",
    "🚩 FISIP"="🚩 FISIP",
    "🏥 FK"="🏥 FK",
    "⚙️ FT"="⚙️ FT",
    "👨‍🏫 FKIP"="👨‍🏫 FKIP",
    "🔬 FMIPA"="🔬 FMIPA",
    "🖌️ FSRD"="🖌️ FSRD",
    "🏀 FKOR"="🏀 FKOR",
    "💻 FATISDA"="💻 FATISDA",
    "🧑‍🤝‍🧑 FAPSI"="🧑‍🤝‍🧑 FAPSI",
    "🏫 SV"="🏫 SV",
}

enum FacultiesUMS {
    "☪️ FAI"="☪️ FAI",
    "📈 FEB"="📈 FEB",
    "💊 FF"="💊 FF",
    "🌍 FG"="🌍 FG",
    "⚖️ FH"="⚖️ FH",
    "🩺 FIK"="🩺 FIK",
    "🏥 FK"="🏥 FK",
    "🦷 FKG"="🦷 FKG",
    "👨‍🏫 FKIP"="👨‍🏫 FKIP",
    "💻 FKI"="💻 FKI",
    "🧑‍🤝‍🧑 FPSI"="🧑‍🤝‍🧑 FPSI",
    "⚙️ FT"="⚙️ FT",
}

export { GENDER, FacultiesUNS, FacultiesUMS }