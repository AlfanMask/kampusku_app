enum RATINGS {
    "DRIVER" = "DRIVER",
    "CUSTOMER" = "CUSTOMER",
}

enum DRIVER_RATING_SERVICES {
    "ANJEM" = "#ANJEM 🏍️",
    "JASTIP" = "#JASTIP 🚚",
    "ALL_AVG" = "ALL",
}

interface DRIVER_RATINGS_POINT {
    point: number,
    num_rater: number,
}

export { RATINGS, DRIVER_RATING_SERVICES, type DRIVER_RATINGS_POINT }