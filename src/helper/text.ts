function truncateText(input: string, maxLength: number) {
    return input.length > maxLength ? input.slice(0, maxLength) + "..." : input;
}

export { truncateText }