import { getFirstName, findMostCommon, parseJSON, validateUserData } from '../src/utils';
import { User } from '../src/types';

describe('utils', () => {
    describe('getFirstName', () => {
        test('gets first name from full name', () => {
            expect(getFirstName("John Smith")).toBe("John");
            expect(getFirstName("Mary Jane Watson")).toBe("Mary");
        });
        test('handles single name', () => {
            expect(getFirstName("John")).toBe("John");
        });
        test('handles empty string', () => {
            expect(getFirstName("")).toBe("");
        });
    });
    describe('findMostCommon', () => {
        test('finds most common item', () => {
            const counts = { 'a': 3, 'b': 1, 'c': 4};
            expect(findMostCommon(counts)).toBe('c');
        });
        test('returns empty string for empty counts', () => {
            const counts = {};
            expect(findMostCommon(counts)).toBe("");
        });
    });
    describe('parseJSON', () => {
        test('parses standard JSON', () => {
            const jsonString = '[{"id": 1, "name": "John Smith"}, {"id": 2, "name": "Jane Doe"}]';
            const result = parseJSON(jsonString);
            expect(result).toEqual([
                { id: 1, name: "John Smith" },
                { id: 2, name: "Jane Doe" },
            ]);
        });
        test('parses NDJSON', () => {
            const ndjsonString = '{"id": 1, "name": "John Smith"}\n{"id": 2, "name": "Jane Doe"}';
            const result = parseJSON(ndjsonString);
            expect(result).toEqual([
                { id: 1, name: "John Smith" },
                { id: 2, name: "Jane Doe" },
            ]);
        });
        test('handles empty input', () => {
            expect(() => parseJSON('')).toThrow('empy input is invalid JSON');
        });
    });
    describe('validateUserData', () => {
        test('validates correct user data', () => {
            const validUser: User[] = [{
                id: 1,
                name: "John",
                age: 30,
                city: "New York",
                friends: []
            }];
            expect(validateUserData(validUser)).toEqual(validUser);
        });
       test('throws error on empty array', () => {
        expect(() => validateUserData([])).toThrow("Data is not an array or is empty");
       });
       test('throws error on non-array input', () => {
        expect(() => validateUserData({} as any[])).toThrow("Data is not an array or is empty");
       });
    });
});