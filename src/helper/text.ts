function truncateText(input: string, maxLength: number) {
    return input.length > maxLength ? input.slice(0, maxLength) + "..." : input;
}

function removeHTMLElements(input: string) {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
}

export { truncateText, removeHTMLElements }