function calculatePrice(distanceMeter: number): number {
    const basePrice = 5000;
    let additionalPrice = 0;
    const extraDistance = distanceMeter - 1500;

    if (distanceMeter > 10000) {
        additionalPrice = Math.ceil(extraDistance / 500) * 1300;
    } else if (distanceMeter > 5000) {
        additionalPrice = Math.ceil(extraDistance / 500) * 1150;
    } else if (distanceMeter > 1500) {
        additionalPrice = Math.ceil(extraDistance / 500) * 1000;
    }

    // Calculate total price, rounded down to the nearest thousand
    const totalPrice = Math.floor((basePrice + additionalPrice) / 1000) * 1000;
    return totalPrice;
}

export {calculatePrice}