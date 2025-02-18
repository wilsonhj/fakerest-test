"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstName = getFirstName;
exports.findMostCommon = findMostCommon;
exports.parseJSON = parseJSON;
exports.validateUserData = validateUserData;
function getFirstName(fullName) {
    return fullName.split(" ")[0] || fullName;
}
function findMostCommon(counts) {
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
function parseJSON(rawData) {
    if (!rawData.trim()) {
        throw new Error('Empty input is not valid JSON');
    }
    try {
        // Try parsing as standard JSON first
        const parsed = JSON.parse(rawData);
        return Array.isArray(parsed) ? parsed : [parsed];
    }
    catch (error) {
        // If standard JSON fails, try parsing as NDJSON
        try {
            const lines = rawData.trim().split('\n');
            return lines.filter(line => line.trim()).map(line => JSON.parse(line));
        }
        catch (e) {
            throw new Error(`Failed to parse JSON: ${e.message}`);
        }
    }
}
function validateUserData(data) {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Data is not an array or is empty");
    }
    return data;
}
function parseStandardJSON(rawData) {
    return JSON.parse(rawData);
}
function parseNDJSON(rawData) {
    return rawData
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => JSON.parse(line));
}
//# sourceMappingURL=utils.js.map