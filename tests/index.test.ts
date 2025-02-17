import axios from 'axios';
import { exec } from 'child_process';
import { promisify } from 'util';   
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const execAsync = promisify(exec);

describe('CLI integration tests', () => {
    test('runs with default endpoint', async () => {
        // Mock the API response
        const mockUsers = [{
            id: 1,
            name: "Test User",
            age: 30,
            city: "Test City",
            friends: []
        }];
        
        mockedAxios.get.mockResolvedValueOnce({
            data: JSON.stringify(mockUsers)
        });

        try {
            const {stdout, stderr} = await execAsync('ts-node src/index.ts');
            const output = JSON.parse(stdout);
            expect(output).toHaveProperty('averageAgePerCity');
            expect(output).toHaveProperty('averageFriendsPerCity');
            
            expect(stderr).toBe('');
        } catch (error: any) {
            console.error('Test failed:', error.message);
            throw error;
        }
    }, 10000);
});