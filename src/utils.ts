export function getFirstName(fullName: string): string {
    return fullName.split(" ")[0] || fullName;
}

export function findMostCommon(counts: Record<string, number>): string {
    let maxCount = -1;
    let mostCommon = "";
    for (const [key, count] of Object.entries(counts)) {
        if (count > maxCount) {
            maxCount = count;
            mostCommon = key;
        }
    }
    return mostCommon;
}