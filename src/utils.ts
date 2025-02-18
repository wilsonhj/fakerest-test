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

// Pure function to clean JSON data
export const cleanJsonData = (raw: string): string => 
    raw.replace(/[\x00-\x1F\x7F-\x9F]/g, '')
        .trim();

// Pure function to safely parse JSON
export const safeJsonParse = (data: string): unknown => {
    try {
        return JSON.parse(data);
    } catch (e) {
        // Type guard for Error objects
        if (e instanceof Error) {
            throw new Error(`Invalid JSON format: ${e.message}`);
        }
        // Fallback for unknown error types
        throw new Error('Invalid JSON format: Unknown error');
    }
};

// Parse NDJSON (Newline Delimited JSON)
export const parseNDJSON = (data: string): unknown[] => 
    data.split('\n')
        .filter(line => line.trim())
        .map(line => safeJsonParse(cleanJsonData(line)));

// Main parsing function with better error handling
export const parseJSON = (rawData: string): unknown[] => {
    if (!rawData.trim()) {
        throw new Error('Empty input is not valid JSON');
    }

    try {
        // Try parsing as standard JSON first
        const cleaned = cleanJsonData(rawData);
        const parsed = safeJsonParse(cleaned);
        return Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
        // If standard JSON fails, try parsing as NDJSON
        try {
            return parseNDJSON(rawData);
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(`Failed to parse JSON: ${e.message}`);
            }
            throw new Error('Failed to parse JSON: Unknown error');
        }
    }
};

// Type guard for User array
export const isUserArray = (data: unknown): data is User[] => 
    Array.isArray(data) && 
    data.length > 0 &&
    data.every(item => 
        typeof item === 'object' && 
        item !== null &&
        'id' in item &&
        'name' in item &&
        'age' in item &&
        'city' in item &&
        'friends' in item
    );

// Validate user data with type safety
export const validateUserData = (data: unknown): User[] => {
    if (!isUserArray(data)) {
        throw new Error("Data is not an array or is empty");
    }
    return data;
};



