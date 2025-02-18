import axios from 'axios';
import { run, clearCache } from '../src/runner';
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CLI integration tests', () => {
    beforeEach(() => {
        // Reset all mocks and cache before each test
        jest.resetAllMocks();
        mockedAxios.get.mockReset();
        clearCache();
        
        // Default success mock
        const mockUsers = [{
            id: 1,
            name: "Test User",
            age: 30,
            city: "Test City",
            friends: [{
                id: 2,
                name: "Friend User",
                hobbies: ["reading"]
            }]
        }];

        mockedAxios.get.mockResolvedValue({
            status: 200,
            statusText: 'OK',
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(mockUsers)
        });
    });

    test('processes data with default endpoint', async () => {
        // Set test environment
        const endpoint = "http://test.brightsign.io:3000";
        const rawOutput = true;
        const debug = false;

        // Run the function
        const result = await run(endpoint, rawOutput, debug);
        const parsedResult = JSON.parse(result);
        
        // Verify API was called correctly
        expect(mockedAxios.get).toHaveBeenCalledWith(
            endpoint,
            expect.any(Object)
        );
        
        // Verify output structure and values
        expect(parsedResult).toHaveProperty('averageAgePerCity');
        expect(parsedResult).toHaveProperty('averageFriendsPerCity');
        expect(parsedResult.averageAgePerCity['Test City']).toBe(30);
        expect(parsedResult.averageFriendsPerCity['Test City']).toBe(1);
    });

    test('handles API errors gracefully', async () => {
        // Reset everything
        mockedAxios.get.mockReset();
        clearCache();
        
        // Set up error case
        mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
        const endpoint = "http://test.brightsign.io:3000";
        
        // Verify error handling
        await expect(run(endpoint, true, false))
            .rejects
            .toThrow('Failed to fetch data: Error: API Error');
    });

    afterEach(() => {
        jest.resetAllMocks();
        clearCache();
    });
});