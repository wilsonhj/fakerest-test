import axios from "axios";
import { computeStats } from "./dataProcessor";
import { parseJSON, validateUserData } from "./utils";

// Type for cache key
type CacheKey = `${string}-${boolean}`;

// Cache implementation
const cache = new Map<CacheKey, string>();

// Expose cache clearing for tests
export const clearCache = (): void => cache.clear();

// Pure function to format output
const formatOutput = (data: unknown, rawOutput: boolean): string =>
    rawOutput ? JSON.stringify(data) : JSON.stringify(data, null, 2);

// Fetch data with error handling
const fetchData = async (endpoint: string): Promise<string> => {
    try {
        const response = await axios.get(endpoint, {
            responseType: "text",
            timeout: 5000,
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error}`);
    }
};

// Process data pipeline
const processData = (rawData: string) => {
    const parsedData = parseJSON(rawData);
    const validatedData = validateUserData(parsedData);
    return computeStats(validatedData);
};

export async function run(
    endpoint: string,
    rawOutput: boolean,
    debug: boolean
): Promise<string> {
    try {
        // Check cache
        const cacheKey: CacheKey = `${endpoint}-${rawOutput}`;
        if (cache.has(cacheKey)) {
            return cache.get(cacheKey)!;
        }

        // Fetch and process data
        const rawData = await fetchData(endpoint);
        
        if (debug) {
            console.error("Raw response:", rawData);
        }

        // Process data and format output
        const result = processData(rawData);
        const output = formatOutput(result, rawOutput);

        // Cache result
        cache.set(cacheKey, output);
        return output;

    } catch (error) {
        if (error instanceof Error) {
            throw error; // Re-throw the original error
        }
        throw new Error(`Error: ${error}`);
    }
} 