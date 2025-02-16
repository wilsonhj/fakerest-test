import { User } from "./types";

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

export function parseJSON(rawData: string): any[] {
    if (!rawData.trim()) {
        throw new Error("empy input is invalid JSON");
    }
    try {
        return parseStandardJSON(rawData);
    } catch (error) {
        return parseNDJSON(rawData);
    }
}

export function validateUserData(data: any[]): User[] {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Data is not an array or is empty");
    }
    return data as User[];
}

function parseStandardJSON(rawData: string): any[] {
    return JSON.parse(rawData);
}

function parseNDJSON(rawData: string): any[] {
    return rawData
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => JSON.parse(line));
}

